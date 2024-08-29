async function createTask() {
  let taskTitle = document.getElementById("title").value;
  let taskDescription = document.getElementById("description").value;
  let taskDate = document.getElementById("due-date-input").value;
  let taskCategory = document.getElementById("category-displayed").textContent.trim();

  let taskPrio = getTaskPrio();

  let taskSubtasks = "";
  let assignedTo = "";

  let subtaskItems = document.getElementById("subtaskList").children;

  if (subtaskItems.length > 0) {
    for (let i = 0; i < subtaskItems.length; i++) {
      taskSubtasks += subtaskItems[i].textContent.trim() + "|";
    }
    taskSubtasks = taskSubtasks.slice(0, -1);
  }

  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      let checkbox = document.getElementById(`AssignedContact${i}`);

      if (checkbox.checked == true) {
        assignedTo += users[i].name + ",";
      }
    }
    assignedTo = assignedTo.slice(0, -1);
  }

  let newTask = {
    title: taskTitle,
    description: taskDescription,
    date: taskDate,
    category: taskCategory,
    priority: taskPrio,
    level: "To do",
    subtasks: taskSubtasks,
    assigned: assignedTo
  };

  saveTasks("/tasks", newTask);
}

function getTaskPrio() {
  if (document.getElementById("urgent").className.includes("btn-bg-change-urgent-onclick")) {
    return "Urgent";
  }
  if (document.getElementById("medium").className.includes("btn-bg-change-medium-onclick")) {
    return "Medium";
  }
  if (document.getElementById("low").className.includes("btn-bg-change-low-onclick")) {
    return "Low";
  }
  return "None";
}

//reset all Class from Prio Buttons
function clearPrioButtons()
{
  document.getElementById('urgent').className = "btn-prio btn-prio:hover";
  document.getElementById('urgent-whiteID').className ="d-none";
  document.getElementById('urgentID').className ="";
  document.getElementById('urgent').style.boxShadow = "";

  document.getElementById('medium').className = "btn-prio";
  document.getElementById('medium-whiteID').className ="d-none";
  document.getElementById('mediumID').className ="";
  document.getElementById('medium').style.boxShadow = "";

  document.getElementById('low').className = "btn-prio";
  document.getElementById('low-whiteID').className ="d-none";
  document.getElementById('lowID').className ="";
  document.getElementById('low').style.boxShadow = "";
}
//click on Urgent Prio Button
function clickOnUrgent() {
  let alreadyKlicked = false;
  if (getTaskPrio() == "Urgent") {
    alreadyKlicked = true;
  }
  clearPrioButtons();
  if (alreadyKlicked == false) {
    document.getElementById("urgent").classList.remove("btn-bg-change-back-onclick");
    document.getElementById("urgent").classList.toggle("btn-bg-change-urgent-onclick");
    document.getElementById("urgent").style.boxShadow = "none";
    document.getElementById("urgentID").classList.toggle("d-none");
    document.getElementById("urgent").classList.toggle("prio-txt-color-set-white");
    document.getElementById("urgent-whiteID").classList.toggle("d-none");
  }
}
//click on Medium Prio Button
function clickOnMedium() {
  let alreadyKlicked = false;
  if (getTaskPrio() == "Medium") {
    alreadyKlicked = true;
  }
  clearPrioButtons();
  if (alreadyKlicked == false) {
    document.getElementById("medium").classList.remove("btn-bg-change-back-onclick");
    document.getElementById("medium").classList.toggle("btn-bg-change-medium-onclick");
    document.getElementById("medium").style.boxShadow = "none";
    document.getElementById("mediumID").classList.toggle("d-none");
    document.getElementById("medium").classList.toggle("prio-txt-color-set-white");
    document.getElementById("medium-whiteID").classList.toggle("d-none");
  }
}
//click on Low Prio Button
function clickOnLow() 
{
  let alreadyKlicked = false;
  if (getTaskPrio() == "Low") {
    alreadyKlicked = true;
  }
  clearPrioButtons();
  if (alreadyKlicked == false) {
    document.getElementById("low").classList.remove("btn-bg-change-back-onclick");
    document.getElementById("low").classList.toggle("btn-bg-change-low-onclick");
    document.getElementById("low").style.boxShadow = "none";
    document.getElementById("lowID").classList.toggle("d-none");
    document.getElementById("low").classList.toggle("prio-txt-color-set-white");
    document.getElementById("low-whiteID").classList.toggle("d-none");
  }
}

/*Begin dropdown assigned to and dropdown category*/
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
 
}

function closeAssignedto() {
  let dropdown = document.getElementById('myDropdown');
  let container = document.getElementById('contacts-list'); 

  document.addEventListener('click', (event) => {
  if (!container.contains(event.target) && dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
  }
});
}

function toggleDropdownCategory() {
  document.getElementById("myDropdownCategory").classList.toggle("show");
}

window.onclick = function (event) {
  // Überprüfen, ob außerhalb des Dropdowns "myDropdown" geklickt wurde
  if (!event.target.closest(".select.assigned-to")) {
    //closeDropdown("myDropdown");
  }
  // Überprüfen, ob außerhalb des Dropdowns "myDropdownCategory" geklickt wurde
  if (!event.target.closest(".select.category")) {
    closeDropdown("myDropdownCategory");
  }
};

function closeDropdown(dropdownId) {
  let dropdown = document.getElementById(dropdownId);
  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
  }
}

async function renderAssignedTo() {
  let assignedMenu = document.getElementById("myDropdown");
  let j = 1;

  // Setze den Inhalt von assignedMenu zurück
  assignedMenu.innerHTML = "";

  // Benutzer laden
  await loadUsers("/users");

  // Duplikate entfernen
  let uniqueUsers = [];
  users.forEach(user => {
      if (!uniqueUsers.some(uniqueUser => uniqueUser.email === user.email)) {
          uniqueUsers.push(user.name.trim());
      }
  });

  // Nutze eine temporäre Variable, um den gesamten HTML-Inhalt zu erstellen
  let htmlContent = "";

  for (let i = 0; i < uniqueUsers.length; i++) {
      htmlContent += `
          <label onclick="event.stopPropagation();"><li class="list-item assigned-to"></label>
              <div class="list-item-name" onclick="toggleCheckbox('AssignedContact${i}')">
                  <label><div class="circle initialsColor${j}">${getUserInitials(uniqueUsers[i])}</div></label>
                  <label>${uniqueUsers[i]}</label>
              </div>
              <input type="checkbox" onclick="toggleBackground(this)" id="AssignedContact${i}" name="AssignedContact">
          </li>
      `;

      j++;
      if (j > 15) {
          j = 1;
      }
  }

  // Weisen Sie den gesamten generierten HTML-Inhalt einmal zu
  assignedMenu.innerHTML = htmlContent;
}

function toggleCheckbox(checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  checkbox.checked = !checkbox.checked;  // Umschalten des aktuellen Zustands der Checkbox
  toggleBackground(checkbox);  // Optional: Deine Funktion aufrufen, um das Hintergrund-Design zu ändern
}


function toggleBackground(checkbox) {
  const listItem = checkbox.closest(".list-item");
  const contactName = listItem.querySelector(".list-item-name label").textContent.trim();
  const contactCircle = listItem.querySelector(".circle").cloneNode(true); // Kopiere das Kreis-Element

  const selectedContactsContainer = document.getElementById("selected-contacts-container");

  if (checkbox.checked) {
    listItem.style.backgroundColor = "#2a3647";
    listItem.style.color = "white";

    // Füge das Kreis-Element zum ausgewählten Kontaktcontainer hinzu
    selectedContactsContainer.appendChild(contactCircle);
  } else {
    listItem.style.backgroundColor = ""; // Setzt die Hintergrundfarbe zurück
    listItem.style.color = "black";

    // Entferne das Kreis-Element aus dem ausgewählten Kontaktcontainer
    const circles = selectedContactsContainer.querySelectorAll(".circle");
    circles.forEach((circle) => {
      if (circle.textContent.trim() === contactCircle.textContent.trim()) {
        selectedContactsContainer.removeChild(circle);
      }
    });
  }
}
/*End dropdown assigned to*/

/*Begin Subtask input*/
document.addEventListener("DOMContentLoaded", () => {
  const subtaskInput = document.querySelector(".input.subtask");
  const subtaskBtnAdd = document.querySelector(".btn-subtask.add");
  const subtaskBtnCheckCancel = document.querySelector(".btn-subtask.check-cancel");
  const subtaskCancelBtn = document.querySelector(".cancel-subtask");
  const subtaskCheckBtn = document.querySelector(".check-subtask");

  let subtasks = [];

  function styleSubtaskInput() {
    subtaskBtnAdd.addEventListener("click", () => {
      subtaskBtnAdd.style.display = "none";
      subtaskBtnCheckCancel.style.display = "flex";
      subtaskInput.focus();
    });

    subtaskInput.addEventListener("focus", () => {
      subtaskBtnAdd.style.display = "none";
      subtaskBtnCheckCancel.style.display = "flex";
    });

    subtaskCancelBtn.addEventListener("click", () => {
      subtaskBtnAdd.style.display = "flex";
      subtaskBtnCheckCancel.style.display = "none";
      subtaskInput.value = "";
    });
  }

  function addSubtask() {
    if (subtaskInput.value.trim() !== "") {
      subtasks.push(subtaskInput.value.trim());
      renderSubtasks();
      subtaskInput.value = "";
      subtaskBtnAdd.style.display = "flex";
      subtaskBtnCheckCancel.style.display = "none";
    }
  }

  // Event Listener für das Hinzufügen eines Subtasks
  subtaskCheckBtn.addEventListener("click", addSubtask);

  // Event Listener für das Drücken der Enter-Taste
  subtaskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addSubtask();
    }
  });

  function renderSubtasks() {
    const subtasksList = document.querySelector(".list-subtasks");
    subtasksList.innerHTML = "";
    subtasks.forEach((item, index) => {
      subtasksList.innerHTML += `
              <li class="subtask-list-item" data-index="${index}">
                  <div class="li-text">${item}</div>
                  <div class="subtask-edit-icon-div">
                      <img class="edit-subtask-btn" src="./img/edit.png" alt="">
                      <div class="subtask-divider-2"></div>
                      <img class="delete-subtask-btn" src="./img/delete.png" alt="">
                  </div>
              </li>
          `;
    });
    editSubTask();
    deleteSubtask();
  }

  function editSubTask() {
    const subtaskListItems = document.querySelectorAll(".subtask-list-item");

    subtaskListItems.forEach((item) => {
      const editSubtaskBtn = item.querySelector(".edit-subtask-btn");

      const handleEdit = () => {
        let input = item.querySelector(".edit-subtask-input");
        if (!input) {
          let liText = item.querySelector(".li-text");
          item.innerHTML = `
                      <input class="edit-subtask-input" type="text" value="${liText.textContent.trim()}">
                      <div class="edit-subtask-button-div">
                          <span class="delete-subtask-btn edit"><img src="./img/delete.png"></span>
                          <div class="subtask-divider"></div>
                          <span class="confirm-subtask-edit-btn"><img src="./img/check.png"></span>
                      </div>
                  `;
          item.classList.add("subtask-list-item-edit");
          deleteSubtask();
          confirmSubtaskEdit();
        }
      };

      editSubtaskBtn.addEventListener("click", handleEdit);
      item.addEventListener("dblclick", handleEdit);
    });
  }

  function deleteSubtask() {
    const subtaskListItems = document.querySelectorAll(".subtask-list-item");

    subtaskListItems.forEach((item, index) => {
      const deleteSubtaskBtn = item.querySelector(".delete-subtask-btn");
      deleteSubtaskBtn.addEventListener("click", () => {
        subtasks.splice(index, 1);
        renderSubtasks();
      });
    });
  }

  function confirmSubtaskEdit() {
    const subtaskListItemsEdit = document.querySelectorAll(".subtask-list-item-edit");

    subtaskListItemsEdit.forEach((item) => {
      const confirmSubtaskEditBtn = item.querySelector(".confirm-subtask-edit-btn");
      confirmSubtaskEditBtn.addEventListener("click", () => {
        const index = item.getAttribute("data-index");
        const input = item.querySelector(".edit-subtask-input");
        if (input.value !== "") {
          subtasks[index] = input.value;
          renderSubtasks();
        }
      });
    });
  }

  styleSubtaskInput();
});

/*End Subtask input*/

document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("due-date-input");

  // Hole das heutige Datum im Format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Setze das min-Attribut auf das heutige Datum
  dateInput.setAttribute("min", today);
});

function selectTechnicalStack()
{
  let categoryTechnicalStack = document.getElementById('categoryTechnicalStack').innerHTML;

  let selectCategory = document.getElementById('category-displayed');
  selectCategory.innerHTML = '';
  selectCategory.innerHTML = categoryTechnicalStack;
} 

function selectUserStory()
{
  let categoryselectUserStory = document.getElementById('categoryUserStory').innerHTML;

  let selectCategory = document.getElementById('category-displayed');
  selectCategory.innerHTML = '';
  selectCategory.innerHTML = categoryselectUserStory;
}

/*Begin Form validation*/
function createTask() {
  let isValid = true;

  // Title validation
  const title = document.getElementById('title');
  const titleRequired = document.getElementById('title-required');
  if (title.value.trim() === '') {
      titleRequired.style.display = 'block';
      isValid = false;
  } else {
      titleRequired.style.display = 'none';
  }

  // Due date validation
  const dueDate = document.getElementById('due-date-input');
  const dateRequired = document.getElementById('date-required');
  if (dueDate.value.trim() === '') {
      dateRequired.style.display = 'block';
      isValid = false;
  } else {
      dateRequired.style.display = 'none';
  }

  // Category validation
  const categoryContainer = document.getElementById('category-container');
  const categoryRequired = document.getElementById('category-required');
  if (categoryContainer.textContent.trim() === 'Select task category') {
      categoryRequired.style.display = 'block';
      isValid = false;
  } else {
      categoryRequired.style.display = 'none';
  }

  // Prevent form submission if validation fails
  if (!isValid) {
      event.preventDefault(); // Prevent form submission if validation fails
  }
}

function clearForm() {
  // Leert alle Textfelder
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('due-date-input').value = '';

  // Setzt den ausgewählten Kategorie-Text zurück
  document.getElementById('category-displayed').textContent = 'Select task category';

  // Setzt das ausgewählte Prio-Design zurück
  document.querySelectorAll('.btn-prio').forEach(btn => {
      btn.classList.remove('selected');  // Entferne die "selected"-Klasse von allen Prio-Buttons
      let imgElements = btn.getElementsByTagName('img');
      imgElements[0].classList.remove('d-none');  // Zeige das farbige Icon an
      imgElements[1].classList.add('d-none');  // Verstecke das weiße Icon
  });

  // Setzt die Subtask-Liste zurück
  document.getElementById('subtaskList').innerHTML = '';

  // Leert das Dropdown-Menü "Assigned to"
  document.getElementById('selected-contacts-container').innerHTML = '';

  // Alle Checkboxen im Dropdown "Assigned to" zurücksetzen
  const checkboxes = document.querySelectorAll('#myDropdown input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
      checkbox.checked = false;
      const listItem = checkbox.closest(".list-item");
      listItem.style.backgroundColor = '';  // Hintergrundfarbe zurücksetzen
      listItem.style.color = 'black';  // Textfarbe zurücksetzen
  });

  // Schließe das Dropdown-Menü, falls es noch offen ist
  closeDropdown("myDropdown");
  closeDropdown("myDropdownCategory");
}




