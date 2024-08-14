function clickOnUrgent() {
  document
    .getElementById("urgent")
    .classList.remove("btn-bg-change-back-onclick");
  document
    .getElementById("urgent")
    .classList.add("btn-bg-change-urgent-onclick");
  document.getElementById("urgent").style.boxShadow = "none";

  document.getElementById("low").classList.add("btn-bg-change-back-onclick");
  document.getElementById("low").style.boxShadow =
    "box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);";

  document.getElementById("medium").classList.add("btn-bg-change-back-onclick");
  document.getElementById("medium").style.boxShadow =
    "box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);";
}

function clickOnMedium() {
  document
    .getElementById("medium")
    .classList.remove("btn-bg-change-back-onclick");
  document
    .getElementById("medium")
    .classList.add("btn-bg-change-medium-onclick");
  document.getElementById("medium").style.boxShadow = "none";

  document.getElementById("urgent").classList.add("btn-bg-change-back-onclick");
  document.getElementById("urgent").style.boxShadow =
    "box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);";

  document.getElementById("low").classList.add("btn-bg-change-back-onclick");
  document.getElementById("low").style.boxShadow =
    "box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);";
}

function clickOnLow() {
  document.getElementById("low").classList.remove("btn-bg-change-back-onclick");
  document.getElementById("low").classList.add("btn-bg-change-low-onclick");
  document.getElementById("low").style.boxShadow = "none";

  document.getElementById("medium").classList.add("btn-bg-change-back-onclick");
  document.getElementById("medium").style.boxShadow =
    "box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);";

  document.getElementById("urgent").classList.add("btn-bg-change-back-onclick");
  document.getElementById("urgent").style.boxShadow =
    "box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);";
}
/*Begin dropdown assigned to*/
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.closest(".select.assigned-to")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

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
                            <span>${users[i].name}</span>
                        </div>
                        <img class="checkbox " src="img/checkbox_button.svg" alt="">
                      </li>
    `;

    j++;
    if(j > 15) { j = 1; }
  }
}
/*End dropdown assigned to*/
