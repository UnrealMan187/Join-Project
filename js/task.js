let tasks = [];

function createTask() {
  let taskTitle = document.getElementById("title").value;
  let taskDescription = document.getElementById("description").value;
  let taskDate = document.getElementById("due-date-input").value;
  let taskCategory = document.getElementById("category-container").value;

  let taskPrio = getTaskPrio();

  let taskSubtasks = "";
  let assignedTo = "";

  let subtaskItems = document.getElementById("subtaskList").children;

  if (subtaskItems.length > 0) {
    for (let i = 0; i < subtaskItems.length; i++) {
      taskSubtasks += subtaskItems[i].textContent.trim() + ",";
    }
    taskSubtask = taskSubtasks.slice(0, -1);
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

  alert(taskPrio);

  tasks.push({
    title: taskTitle,
    description: taskDescription,
    date: taskDate,
    category: taskCategory,
    priority: taskPrio,
    subtasks: taskSubtasks,
    assigned: assignedTo,
  });
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
}

function clearPrioButtons()
{
  document.getElementById('urgent').className = "btn-prio btn-prio:hover";
  document.getElementById('urgent-whiteID').className ="d-none";
  document.getElementById('urgentID').className ="";
  document.getElementById('urgent').style.boxShadow.toggle;

  document.getElementById('medium').className = "btn-prio";
  document.getElementById('medium-whiteID').className ="d-none";
  document.getElementById('mediumID').className ="";
  
  document.getElementById('low').className = "btn-prio";
  document.getElementById('low-whiteID').className ="d-none";
  document.getElementById('lowID').className ="";
}

function clickOnUrgent() {
  clearPrioButtons();
  document.getElementById("urgent").className = "btn-prio btn-bg-change-urgent-onclick prio-txt-color-set-white";
  document.getElementById("urgent").style.boxShadow.toggle;
  document.getElementById("urgentID").classList.toggle("d-none");
  document.getElementById("urgent-whiteID").classList.toggle("d-none");
}

function clickOnMedium() {
  clearPrioButtons();
  document.getElementById("medium").classList.remove("btn-bg-change-back-onclick");
  document.getElementById("medium").classList.toggle("btn-bg-change-medium-onclick");
  document.getElementById("medium").style.boxShadow = "none";
  document.getElementById("mediumID").classList.toggle("d-none");
  document.getElementById("medium").classList.toggle("prio-txt-color-set-white");
  document.getElementById("medium-whiteID").classList.toggle("d-none");
}

function clickOnLow() {
  clearPrioButtons();
  document.getElementById("low").classList.remove("btn-bg-change-back-onclick");
  document.getElementById("low").classList.toggle("btn-bg-change-low-onclick");
  document.getElementById("low").style.boxShadow = "none";
  document.getElementById("lowID").classList.toggle("d-none");
  document.getElementById("low").classList.toggle("prio-txt-color-set-white");
  document.getElementById("low-whiteID").classList.toggle("d-none");
}
/*Begin dropdown assigned to and dropdown category*/
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function toggleDropdownCategory() {
  document.getElementById("myDropdownCategory").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.closest(".select.assigned-to")) {
   closeDropdown("myDropdown");
  }
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

  await loadUsers("/users");

  assignedMenu.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    assignedMenu.innerHTML += `
                      <li class="list-item assigned-to ">
                        <div class="list-item-name">
                            <div class="circle initialsColor${j}">${getUserInitials(users[i].name)}</div>
                            <label for="AssignedContact">${users[i].name}</label>
                        </div>
                        <input type="checkbox" onclick="toggleBackground(this)" id="AssignedContact${i}" name="AssignedContact">
                      </li>
    `;

    j++;
    if (j > 15) {
      j = 1;
    }
  }
}

/*Toggle bg-color when checkbox is checked*/
function toggleBackground(checkbox) {
  const listItem = checkbox.closest(".list-item");

  if (checkbox.checked) {
    listItem.style.backgroundColor = "#2a3647";
  } else {
    listItem.style.backgroundColor = ""; // Setzt die Hintergrundfarbe zurück
  }
}
/*End dropdown assigned to*/

/*Begin Subtask input*/
document.addEventListener("DOMContentLoaded", () => {
  const subtaskInput = document.querySelector(".input.subtask");
  const subtaskBtnAdd = document.querySelector(".btn-subtask.add");
  const subtaskBtnCheckCancel = document.querySelector(
    ".btn-subtask.check-cancel"
  );
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
    const subtaskListItemsEdit = document.querySelectorAll(
      ".subtask-list-item-edit"
    );

    subtaskListItemsEdit.forEach((item) => {
      const confirmSubtaskEditBtn = item.querySelector(
        ".confirm-subtask-edit-btn"
      );
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
