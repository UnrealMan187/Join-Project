const FIREBASE_URL =
  "https://join-4d42f-default-rtdb.europe-west1.firebasedatabase.app/";
let users = [];

async function loadUsers(path = "/users") {
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

  async function addUser() {
    let nameValue = document.getElementById("name").value;
    let phoneValue = document.getElementById("phone").value;
    let emailValue = document.getElementById("email").value;
    let newUser = { name: nameValue, email: emailValue, phone: phoneValue };
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    await postData("/users", newUser);
    await loadUsers("/users");
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
}
