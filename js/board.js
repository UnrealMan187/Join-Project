/*Begin Drag & Drop*/

/**
 * Initiates the dragging operation for a task card.
 * @param {number} id - The ID of the task card being dragged.
 */
function startDragging(id) {
    draggedItemId = id;
    const card = document.getElementById(`taskCard${id}`);
    card.classList.add('dragging');
    highlightDropZones();
}

/**
 * Allows dropping elements into the specified drop target.
 * @param {Event} ev - The drag event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Handles the dropping of a task into a specified status.
 * @param {string} status - The status where the task is dropped.
 */
async function drop(status) {
    const taskIndex = tasks.findIndex(task => task.id === draggedItemId);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = status;
        removeHighlight();
        renderCards();
    }
    await putDataEdit(`/tasks`, tasks)
}

/**
 * Highlights the drop zones where a task can be dropped.
 */
function highlightDropZones() {
    const containers = document.querySelectorAll('.cardContainer');
    containers.forEach(container => {
        if (container.id !== `cardContainer${tasks.find(task => task.id === draggedItemId).status}`) {
            container.classList.add('highlightDragArea');
        }
    });
}

/**
 * Removes the highlight from all drop zones.
 */
function removeHighlight() {
    const card = document.getElementById(`taskCard${draggedItemId}`);
    if (card) {
        card.classList.remove('dragging');
    }
    const containers = document.querySelectorAll('.cardContainer');
    containers.forEach(container => {
        container.classList.remove('highlightDragArea');
    });
}

/**
 * Event listener for the drag end event
 */
document.addEventListener('dragend', function (event) {
    const card = document.getElementById(`taskCard${draggedItemId}`);
    if (card) {
        card.classList.remove('dragging');
    }
    removeHighlight();
});

/*End Drag & Drop*/


/**
 * Toggles the visibility of a dropdown content by adding or removing the 'showDropdown' class.
 * */
function toggleDropdown(dropdownId) {
    const dropdownContent = document.getElementById(dropdownId);
    dropdownContent.classList.toggle('showDropdown');
    if (dropdownContent.classList.contains('showDropdown')) {
        closeDropdownOnOutsideClick(dropdownContent);
    }
}

/**
 * Closes the dropdown when clicking outside of it.
 *
 * Adds an event listener to the document to close the dropdown if a click occurs outside
 * its boundaries. The listener is added with a slight delay to avoid immediate closure.
 * */
function closeDropdownOnOutsideClick(dropdownContent) {
    function outsideClickListener(event) {
        if (!dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove('showDropdown');
            document.removeEventListener('click', outsideClickListener);
        }
    }
    setTimeout(() => {
        document.addEventListener('click', outsideClickListener);
    }, 0);
}

/**
 * Generates HTML markup for rendering a task card.
 *
 * Constructs HTML markup representing a task card based on the provided task object.
 * Includes category label, dropdown menu for task actions, task title, description,
 * progress bar, assigned badges, priority indicator, and other dynamic elements.
 *
 * @param {object} task - The task object containing details to render in the card.
 * @returns {string} HTML markup representing the task card.
 */
function renderCardHtml(task) {
    const color = (task.category === 'User Story') ? 'Blue' : 'Green';
    const assignedToArray = Array.isArray(task.assignedTo) ? task.assignedTo : [];
    const dropdownOptions = renderDropdownOptions(task.id, task.status);
    const badgesHtml = renderBadges(assignedToArray);
    const progressHtml = renderProgress(task);

    return `
    <div draggable="true" ondragstart="startDragging(${task.id})" id="taskCard${task.id}" class="taskCard">
        <div class="taskCardTop">
            <label class="category${color}">${task.category}</label>
            <div class="dropdown">
                <button onclick="toggleDropdown('dropdown-content-${task.id}')" class="dropdown-btn">
                    <div class="dropdownBtnContainer"><img src="assets/img/icons/contacts_sub_menu.svg" alt="Dropdown Arrow"></div>
                </button>
                <div id="dropdown-content-${task.id}" class="dropdown-content">
                    ${dropdownOptions}
                </div>
            </div>
        </div>
        <div class="cardBody" onclick="openDialog(); renderCardBig(${task.id})">
            <p class="titleCard">${task.title}</p>
            <p class="descriptionCard">${task.description}</p>
            <div>
                ${progressHtml}
                <div class="footerCard boardFlex">
                    <div class="profileBadges">
                        ${badgesHtml}
                    </div>
                    <div class="prioImg">
                        <img src="assets/img/icons/${task.priority}.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}