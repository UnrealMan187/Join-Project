function clickOnUrgent() {
  document.getElementById("urgent").classList.remove("btn-bg-change-back-onclick");
  document.getElementById("urgent").classList.toggle("btn-bg-change-urgent-onclick");
  document.getElementById("urgent").style.boxShadow = "none";
  document.getElementById('urgentID').classList.toggle('d-none');
  document.getElementById('urgent').classList.toggle('prio-txt-color-set-white');
  document.getElementById('urgent-whiteID').classList.toggle('d-none');

  document.getElementById("low").classList.add("btn-bg-change-back-onclick");
  document.getElementById("low").className = "boxShadow";

  document.getElementById("medium").classList.add("btn-bg-change-back-onclick");
}

function clickOnMedium() {
  document.getElementById("medium").classList.remove("btn-bg-change-back-onclick");
  document.getElementById("medium").classList.toggle("btn-bg-change-medium-onclick");
  document.getElementById("medium").style.boxShadow = "none";
  document.getElementById('medium').classList.toggle('prio-txt-color-set-white');

  document.getElementById("low").classList.add("btn-bg-change-back-onclick");
  document.getElementById("low").classList.add("box-shadow:hover");

  document.getElementById("urgent").classList.add("btn-bg-change-back-onclick");
 
}

function clickOnLow() {
  document.getElementById("low").classList.remove("btn-bg-change-back-onclick");
  document.getElementById("low").classList.add("btn-bg-change-low-onclick");
  document.getElementById("low").style.boxShadow = "none";

  document.getElementById("medium").classList.add("btn-bg-change-back-onclick");

  document.getElementById("urgent").classList.add("btn-bg-change-back-onclick");

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
  var dropdown = document.getElementById(dropdownId);
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
                        <input type="checkbox" onclick="toggleBackground(this)" id="AssignedContact" name="AssignedContact">
                      </li>
    `;

    j++;
    if(j > 15) { j = 1; }
  }
}

/*Toggle bg-color when checkbox is checked*/
function toggleBackground(checkbox) {
  const listItem = checkbox.closest('.list-item');

  if (checkbox.checked) {
    listItem.style.backgroundColor = "#2a3647";
  } else {
    listItem.style.backgroundColor = "";  // Setzt die Hintergrundfarbe zurück
  }
}
/*End dropdown assigned to*/
