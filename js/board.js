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