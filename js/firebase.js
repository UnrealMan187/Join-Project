const FIREBASE_URL =
  "https://join-4d42f-default-rtdb.europe-west1.firebasedatabase.app/";
let users = [];
let currentUser = -1;

async function loadUsers(path = "/users") {
  users = [];
  let userResponse = await fetch(FIREBASE_URL + path + ".json");
  let responseToJson = await userResponse.json();
  console.log(responseToJson);

  if (responseToJson) {
    Object.keys(responseToJson).forEach((key) => {
      users.push({
        id: key,
        name: responseToJson[key]["name"],
        email: responseToJson[key]["email"],
        phone: responseToJson[key]["phone"],
      });
    });
    users.sort((a, b) => {
      return a.name.localeCompare(b.name); // sortiere users nach dem Wert "name"
    });
    console.log(users);
  }
}

  async function addUser() {
    let nameValue = document.getElementById("name").value;
    let phoneValue = document.getElementById("phone").value;
    let emailValue = document.getElementById("email").value;
    let newUser = { name: nameValue, email: emailValue, phone: phoneValue };
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    await postData("/users", newUser);
    await renderContacts();
  }

  async function postData(path = "", data = {}) {
    await fetch(FIREBASE_URL + path + ".json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  // id = path in firebase

  async function deleteUser(id) {
    await fetch(FIREBASE_URL + `/users/${id}` + ".json", {
      method: "DELETE",
    });
    await renderContacts();
    loadUserInformation(-1);
  }

  async function editUser(id, data = {}) {
    data.name = document.getElementById("name").value;
    data.email = document.getElementById("email").value;
    data.phone = document.getElementById("phone").value;

    await fetch(FIREBASE_URL + `/users/${id}` + ".json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    renderContacts();
    closePopup();
  }

  // We use the email to identify an User because there may be 2 Users with the same Name but not same email.
  function getUserId(email) {
    if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
          return users[i].id;
        }
      }
    } else {
      return -1; // Default Value -1 means User not found
    }
  }

// renders via templates the Contacts into the contact-list incl. the sorter-div/seperator
async function renderContacts() {
  let html = "";
  let firstLetter = "0";

  await loadUsers("/users");

  for (let i = 0; i < users.length; i++) {
    if (users[i].name[0].toUpperCase() != firstLetter.toUpperCase()) {
      html += `<div class="contacts-first-letter-container"><span id="firstLetterOfContactName" class="contacts-first-letter">${users[i].name[0].toUpperCase()}</span></div>
              <div class="border-container"> <div class="border"></div></div>`;

      firstLetter = users[i].name[0].toUpperCase();
    }

    html += `<div class="contact-container" onclick="loadUserInformation(${i})">
            <div class="contact-list-ellipse">
               <div class="ellipse-list">${getUserInitials(users[i].name)}</div>
            </div>
            <div class="contact">
                <div class="contact-list-name" id="contactName">${users[i].name}</div>
                <div class="contact-list-email" id="contactEmail">${users[i].email}</div>
            </div>
            </div>
            `;
  }

  document.getElementById("contact-list").innerHTML = html;
}

/**
 * filters the first Letter (to upper case) from every word(name)
 * gets first Letter from first Name and first Letter from last Name
 */
function getUserInitials(username) {
  let result = username.split(" ").map(wort => wort[0].toUpperCase());
  if(username.split(" ").length > 1) {
    result = result[0] + result[result.length - 1];
  } else {
    result = result[0];
  }
  return result;
}

function loadUserInformation(id) {
  document.getElementById("contact-name").innerHTML = id == -1 ? "" : users[id].name;
  document.getElementById("contact-email").innerHTML = id == -1 ? "" : users[id].email;
  document.getElementById("contact-phone").innerHTML = id == -1 ? "" : users[id].phone;
  document.getElementById("ellipse").innerHTML = id == -1 ? "" : getUserInitials(users[id].name);
  if(id == -1) {
    document.getElementById("display-contact").classList.add("d-none");
  } else {
    document.getElementById("display-contact").classList.remove("d-none");
  }
  currentUser = id;
}

async function initContacts() {
  await renderContacts();
  loadUserInformation(-1);
}