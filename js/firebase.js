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
    alert("User deleted!");
    await renderContacts();
    if(currentUser > 0) {
      currentUser--;
      loadUserInformation(currentUser);
    } else {
      loadUserInformation(0);
    }
  }

  async function editUser(id, data = {}) {
    await fetch(FIREBASE_URL + `/users/${id}` + ".json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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
               <div class="ellipse-list"></div>
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
  result = result[0] + result[result.length - 1];
  return result;
}

function loadUserInformation(id) {
  document.getElementById("contact-name").innerHTML = users[id].name;
  document.getElementById("contact-email").innerHTML = users[id].email;
  document.getElementById("contact-phone").innerHTML = users[id].phone;
  currentUser = id;
}

async function initContacts() {
  await renderContacts();
  if(users.length > 0) {
    loadUserInformation(0);
    currentUser = 0;
  }
}