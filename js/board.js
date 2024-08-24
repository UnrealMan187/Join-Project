// Funktion zum Hinzufügen der Drag-and-Drop-Events
function addDragAndDropEvents() {
  const draggedCards = document.querySelectorAll('.taskCard');
  const dropZones = document.querySelectorAll('#cardContainertoDo, #cardContainerinProgress, #cardContainerawaitingFeedback, #cardContainerdone');

  draggedCards.forEach(card => {
      card.ondragstart = (event) => {
          // Die ID des zu ziehenden Elements wird in den Datenübertragungsobjekt gespeichert
          event.dataTransfer.setData("text", event.target.id);
      };
  });

  dropZones.forEach(zone => {
      zone.ondragover = (event) => {
          event.preventDefault();
          event.currentTarget.style.backgroundColor = "#1FD7C1";
      };

      zone.ondragleave = (event) => {
          event.currentTarget.style.backgroundColor = ""; // Zurücksetzen des Hintergrunds
      };

      zone.ondrop = (event) => {
          event.preventDefault();
          event.currentTarget.style.backgroundColor = ""; // Zurücksetzen des Hintergrunds
          const data = event.dataTransfer.getData("text");
          const card = document.getElementById(data);
          event.currentTarget.appendChild(card);
      };
  });
}

function openDialog() {
  document.getElementById("popupOnTaskSelectionID").style.visibility = "visible";
}
function closeDialog() {
  document.getElementById("popupOnTaskSelectionID").style.visibility = "hidden";
}

function popupValueImplementFromTask()
{   
    let titelCardInput = document.getElementById('titelCardID').innerHTML;
    let descriptionCard = document.getElementById('descriptionCardID').innerHTML;
    let contactEllipse = document.getElementById('profileBadges').innerHTML;
    
    let valueFromTask = document.getElementById('popupHeaderID');
    valueFromTask.innerHTML = titelCardInput;
    let valueFromdescription = document.getElementById('popupSpanID');
    valueFromdescription.innerHTML = descriptionCard;
    
    let valueFromEllipse = document.getElementById('popupContactEllipseID');
    valueFromEllipse.innerHTML = '';     
    valueFromEllipse.innerHTML += contactEllipse;

    let valueFromName = document.getElementById('popupContactNameID');
    valueFromName.innerHTML = '';   
     for(let i = 0; i < users.length; i++) {
         valueFromName.innerHTML += `
             <div>${users[i].name}</div>
             `;
          }

}

async function renderBadges() {
  await loadUsers("/users");

  let myBadges = document.getElementById("profileBadges");
  let j = 1;

  myBadges.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    myBadges.innerHTML += `
            <div class="badgeImg initialsColor${j}">${getUserInitials(users[i].name)}</div>
            `;

    j++;
    if (j > 15) {
      j = 1;
    }
  }

  renderTaskCards();
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

      switch(cardContainerIdName) {
        case "To do":
          cardContainerIdName = "cardContainertoDo";
          break;
        case "In Progress":
          cardContainerIdName = "cardContainerinProgress";
          break;
        case "Awaiting Feedback":
          cardContainerIdName = "cardContainerawaitingFeedback";
          break;
        case "Done":
          cardContainerIdName = "cardContainerdone";
          break;
        default:
          cardContainerIdName = "";
          break;
      }
      

      for(j = 0; j < assignedUsers.length; j++) {

        for(c = 0; c < users.length; c++) {
          let cc = c + 1;

          while(cc > 15) { cc = cc - 15; }

          if(users[c].name == assignedUsers[j]) {
            assignedUsersHTML += `
            <div class="badgeImg initialsColor${cc}">${getUserInitials(assignedUsers[j])}</div>
            `;
            break;
          }
        }
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
                <div class="cardBody" onclick="openDialog(); popupValueImplementFromTask()">
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
                      <div id="profileBadges" class="profileBadges">
                        ${assignedUsersHTML}
                      </div>
                      <div class="prioImg">
                        <img src="./img/medium.svg" alt="">
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

// Initiale Aufrufe
renderTaskCards();




/*AddTask Pop up*/

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('dialog[data-modal]');
    const openModalButton = document.getElementById('openModal');
    const closeModalButton = document.getElementById('closeModal');
    const alsoOpenButtons = document.querySelectorAll('.alsoOpenModal'); // Alle Elemente mit der Klasse "alsobtn"


    if (modal && openModalButton && closeModalButton) {
        // Modal öffnen
        openModalButton.addEventListener('click', () => {
            modal.showModal();
        });

        alsoOpenButtons.forEach(button => {
            button.addEventListener('click', () => {
                modal.showModal();
            });
        });


        // Modal schließen
        closeModalButton.addEventListener('click', () => {
            modal.close();
        });

        // Optional: Modal schließen, wenn man außerhalb des Modals klickt
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    } else {
        console.error('Modal, Open Button, or Close Button not found in the DOM.');
    }
});

