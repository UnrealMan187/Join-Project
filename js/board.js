// Funktion zum Hinzufügen der Drag-and-Drop-Events
function addDragAndDropEvents() {
  const draggedCards = document.querySelectorAll(".taskCard");
  const dropZones = document.querySelectorAll(
    "#cardContainertoDo, #cardContainerinProgress, #cardContainerawaitingFeedback, #cardContainerdone"
  );

  draggedCards.forEach((card) => {
    card.ondragstart = (event) => {
      // Die ID des zu ziehenden Elements wird in den Datenübertragungsobjekt gespeichert
      event.dataTransfer.setData("text", event.target.id);
    };
  });

  dropZones.forEach((zone) => {
    zone.ondragover = (event) => {
      event.preventDefault();
      //event.currentTarget.style.backgroundColor = "#1FD7C1";
      event.currentTarget.style.border = "dotted 2px grey";
    };

    zone.ondragleave = (event) => {
      event.currentTarget.style.backgroundColor = ""; // Zurücksetzen des Hintergrunds
      event.currentTarget.style.border = "none";
    };

    zone.ondrop = (event) => {
      event.preventDefault();
      event.currentTarget.style.backgroundColor = ""; // Zurücksetzen des Hintergrunds
      const data = event.dataTransfer.getData("text");
      const card = document.getElementById(data);
      event.currentTarget.appendChild(card);

      event.currentTarget.style.border = "none";

      let newLevel = event.currentTarget.id;

      if (newLevel.includes("cardContainertoDo")) {
        newLevel = "To do";
      }
      if (newLevel.includes("cardContainerinProgress")) {
        newLevel = "In Progress";
      }
      if (newLevel.includes("cardContainerawaitingFeedback")) {
        newLevel = "Awaiting Feedback";
      }
      if (newLevel.includes("cardContainerdone")) {
        newLevel = "Done";
      }

      let taskNr = data.split("-")[1];

      tasks[taskNr].level = newLevel;

      editTask(tasks[taskNr].id, tasks[taskNr]);

      checkTaskLevels();
    };
  });
}

function checkTaskLevels() {
  if (document.getElementById("cardContainertoDo").childElementCount == 0) {
    document.getElementById("emptyTaskTodo").classList.remove("d-none");
  } else {
    document.getElementById("emptyTaskTodo").classList.add("d-none");
  }

  if (document.getElementById("cardContainerinProgress").childElementCount == 0) {
    document.getElementById("emptyTaskInProgress").classList.remove("d-none");
  } else {
    document.getElementById("emptyTaskInProgress").classList.add("d-none");
  }

  if (document.getElementById("cardContainerawaitingFeedback").childElementCount == 0) {
    document.getElementById("emptyTaskAwait").classList.remove("d-none");
  } else {
    document.getElementById("emptyTaskAwait").classList.add("d-none");
  }

  if (document.getElementById("cardContainerdone").childElementCount == 0) {
    document.getElementById("emptyTaskDone").classList.remove("d-none");
  } else {
    document.getElementById("emptyTaskDone").classList.add("d-none");
  }
}

function editPopupTask() {
  clearForm();
  
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == currentId) {
      document.getElementById("inputEdit").value = tasks[i].title;
      document.getElementById("inputDescription").value = tasks[i].description;
      document.getElementById("inputDueDate").value = tasks[i].date;
      let subtasksArray = tasks[i].subtasks.split("|");
      let assignedArray = tasks[i].assigned.split(",");

      clearPrioButtons();
      if (tasks[i].priority == "Urgent") {
        clickOnUrgent();
      }
      if (tasks[i].priority == "Medium") {
        clickOnMedium();
      }
      if (tasks[i].priority == "Low") {
        clickOnLow();
      }

      for (let j = 0; j < subtasksArray.length; j++) {
        let listEntry = document.createElement("li");
        listEntry.textContent = subtasksArray[j];
        document.getElementById("subtaskList").appendChild(listEntry);
      }

      for (let c = 0; c < users.length; c++) {
        for (let a = 0; a < assignedArray.length; a++) {
          if (users[c].name == assignedArray[a]) {
            toggleCheckbox(`AssignedContact${c}`);
          }
        }
      }
    }
  }

  document.getElementById("popupOnTaskSelectionMainContainerID").classList.add("d-none");
  document.getElementById("editPopUpID").classList.remove("d-none");
}

async function editCurrentTask() {
  let newTitle = document.getElementById("inputEdit").value.trim();
  let newDescription = document.getElementById("inputDescription").value.trim();
  let newDate = document.getElementById("inputDueDate").value;
  let newPrio = getTaskPrio();
  let newAssigned = "";
  let newSubtasks = "";
  let currentTask = -1;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == currentId) {
      currentTask = i;
    }
  }

  let oldLevel = tasks[currentTask].level;
  let oldCategory = tasks[currentTask].category;

  let subtaskItems = document.getElementById("subtaskList").getElementsByTagName("li");

  if (subtaskItems.length > 0) {
    for (j = 0; j < subtaskItems.length; j++) {
      newSubtasks += subtaskItems[j].innerText + "|";
    }
  }

  newSubtasks = newSubtasks.slice(0, -1);

  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      let checkbox = document.getElementById(`AssignedContact${i}`);

      if (checkbox.checked == true) {
        newAssigned += users[i].name + ",";
      }
    }
    newAssigned = newAssigned.slice(0, -1);
  }

  let newTask = {
    title: newTitle,
    description: newDescription,
    date: newDate,
    category: oldCategory,
    priority: newPrio,
    level: oldLevel,
    subtasks: newSubtasks,
    assigned: newAssigned,
  };

  //document.getElementById("popupOnTaskSelectionMainContainerID").classList.toggle("d-none");
  //document.getElementById("editPopUpID").classList.remove("d-none");
  

  await editTask(currentId, newTask);
  await renderTaskCards();

  closeDialog();
}

function openDialog() {
  document.getElementById("popupOnTaskSelectionID").style.visibility = "visible";
}
function closeDialog() {
  document.getElementById("popupOnTaskSelectionID").style.visibility = "hidden";
  document.getElementById('editPopUpID').classList.add('d-none');
  document.getElementById('popupOnTaskSelectionMainContainerID').classList.remove('d-none');
}

function popupValueImplementFromTask(taskNr) {
  let contactEllipse = document.getElementById(`profileBadges${taskNr}`).innerHTML;

  document.getElementById("popUpUserStory").innerHTML = tasks[taskNr].category;
  document.getElementById("popupHeaderID").innerHTML = tasks[taskNr].title;
  document.getElementById("popupSpanID").innerHTML = tasks[taskNr].description;

  document.getElementById("dateId").textContent = tasks[taskNr].date;
  document.getElementById("prioId").textContent = tasks[taskNr].priority;
  document.getElementById("prioIdImg").src = `./img/${tasks[taskNr].priority.toLowerCase()}.svg`;

  document.getElementById("popupContactEllipseID").innerHTML = contactEllipse;

  let valueFromName = document.getElementById("popupContactNameID");

  valueFromName.innerHTML = "";

  let assignedNames = tasks[taskNr].assigned.split(",");

  currentId = tasks[taskNr].id;

  for (let j = 0; j < assignedNames.length; j++) {
    valueFromName.innerHTML += `
             <div>${assignedNames[j]}</div>
             `;
  }
}

async function getUserColor(userName) {
  await loadUsers("/users");
  let returnColor = 1;

  for (let i = 0; i < users.length; i++) {
    if (users[i].name == userName) {
      returnColor = i + 1;
      while (returnColor > 15) {
        returnColor -= 15;
      }
      return returnColor;
    }
  }
  return returnColor;
}

async function renderTaskCards() {
  await loadTasks("/tasks");

  document.getElementById("cardContainertoDo").innerHTML = "";
  document.getElementById("cardContainerinProgress").innerHTML = "";
  document.getElementById("cardContainerawaitingFeedback").innerHTML = "";
  document.getElementById("cardContainerdone").innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const uniqueId = `taskCard-${i}`;
    let assignedUsers = tasks[i].assigned.split(",");
    let subTasksArray = tasks[i].subtasks.split("|");
    let assignedUsersHTML = "";

    let cardContainerIdName = tasks[i].level;

    switch (cardContainerIdName) {
      case "To do":
        cardContainerIdName = "cardContainertoDo";
        document.getElementById("emptyTaskTodo").classList.add("d-none");
        break;
      case "In Progress":
        cardContainerIdName = "cardContainerinProgress";
        document.getElementById("emptyTaskInProgress").classList.add("d-none");
        break;
      case "Awaiting Feedback":
        cardContainerIdName = "cardContainerawaitingFeedback";
        document.getElementById("emptyTaskAwait").classList.add("d-none");
        break;
      case "Done":
        cardContainerIdName = "cardContainerdone";
        document.getElementById("emptyTaskDone").classList.add("d-none");
        break;
      default:
        cardContainerIdName = "";
        break;
    }

    while (assignedUsers.length > 0) {
      assignedUsersHTML += `
      <div class="badgeImg initialsColor${await getUserColor(assignedUsers[0])}">${getUserInitials(assignedUsers[0])}</div>
      `;
      assignedUsers.splice(0, 1);
    }

    document.getElementById(cardContainerIdName).innerHTML += `
                <div draggable="true" id="${uniqueId}" class="taskCard">
                <div class="taskCardTop">
                  <label class="categoryGreen">${tasks[i].category}</label>
                  <div class="dropdownCard">
                    <button onclick="toggleDropdown('dropdown-content')" class="dropdown-btn">
                      <div class="dropdownBtnContainer">
                        <img src="" alt="Dropdown Arrow">
                      </div>
                    </button>
                    <div id="dropdown-content" class="dropdown-content">
                      <p onclick="">In Progress</p>
                      <p onclick="">Done</p>
                      <p onclick="">Awaiting Feedback</p>
                    </div>
                  </div>
                </div>
                <div class="cardBody" onclick="openDialog(); popupValueImplementFromTask(${i})">
                  <p id="titelCardID" class="titleCard">${tasks[i].title}</p>
                  <p id="descriptionCardID" class="descriptionCard">${tasks[i].description}</p>
                  <div>
                    <div class="progress">
                      <div class="progressBarContainer">
                        <div id="" class="progressBar" style="width: 50%;"></div>
                      </div>
                      <p class="amountSubtasks">${subTasksArray.length} subtask(s)</p>
                    </div>
                    <div class="footerCard">
                      <div id="profileBadges${i}" class="profileBadges">
                        ${assignedUsersHTML}
                      </div>
                      <div class="prioImg">
                        <img src="./img/${tasks[i].priority.toLowerCase()}.svg" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>  
                  `;
  }
  // Drag-and-Drop-Events nach dem Rendern der Karten hinzufügen
  addDragAndDropEvents();
}

/*AddTask Pop up*/

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("dialog[data-modal]");
  const openModalButton = document.getElementById("openModal");
  const closeModalButton = document.getElementById("closeModal");
  const alsoOpenButtons = document.querySelectorAll(".alsoOpenModal"); // Alle Elemente mit der Klasse "alsobtn"

  if (modal && openModalButton && closeModalButton) {
    // Modal öffnen
    openModalButton.addEventListener("click", () => {
      modal.showModal();
    });

    alsoOpenButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.showModal();
      });
    });

    // Modal schließen
    closeModalButton.addEventListener("click", () => {
      modal.close();
    });

    // Optional: Modal schließen, wenn man außerhalb des Modals klickt
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.close();
      }
    });
  } else {
    console.error("Modal, Open Button, or Close Button not found in the DOM.");
  }
});
