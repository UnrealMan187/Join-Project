const taskCard = document.getElementById('taskCard');
const dropZones = document.querySelectorAll('#cardContainertoDo, #cardContainerinProgress, #cardContainerawaitingFeedback, #cardContainerdone');

// Event listener für den Start des Drag-Vorgangs
taskCard.addEventListener('dragstart', function(event) {
    // Die ID des zu ziehenden Elements wird in den Datenübertragungsobjekt gespeichert
    event.dataTransfer.setData('text/plain', event.target.id);
});

// Event listener für jede Drop-Zone
dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', function(event) {
        // Verhindert das Standardverhalten, damit das Drop-Ereignis ausgelöst wird
        event.preventDefault();
    });

    dropZone.addEventListener('drop', function(event) {
        // Verhindert das Standardverhalten beim Drop
        event.preventDefault();
        // Holt die ID des gezogenen Elements
        const draggedElementId = event.dataTransfer.getData('text/plain');
        // Holt das Element mit dieser ID
        const draggedElement = document.getElementById(draggedElementId);
        // Fügt das gezogene Element in die aktuelle Drop-Zone ein
        dropZone.prepend(draggedElement);
    });
});

function openDialog()
{
    document.getElementById('popupOnTaskSelectionID').style.visibility = "visible";
}
function closeDialog()
{
    document.getElementById('popupOnTaskSelectionID').style.visibility = "hidden";
}

async function popupValueImplementFromTask()
{   
    let titelCardInput = document.getElementById('titelCardID').innerHTML;
    let descriptionCard = document.getElementById('descriptionCardID').innerHTML;
    let contactEllipse = document.getElementById('profileBadges').innerHTML;
    
    let valueFromTask = document.getElementById('popupHeaderID');
    valueFromTask.innerHTML = titelCardInput;
    let valueFromdescription = document.getElementById('popupSpanID');
    valueFromdescription.innerHTML = descriptionCard;
    
    let valueFromEllipse = document.getElementById('popupContactEllipseID');
        valueFromEllipse.innerHTML += contactEllipse;

    let valueFromName = document.getElementById('popupContactNameID');
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

    for(let i = 0; i < users.length; i++) {
        myBadges.innerHTML += `
            <div class="badgeImg initialsColor${j}">${getUserInitials(users[i].name)}</div>
            `;

            j++;
            if(j > 15) { j = 1; }
    }
}