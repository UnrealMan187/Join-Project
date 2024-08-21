// scripts.js

/**
 * Funktion, die beim Laden des Logos eine Animation ausführt.
 */
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo");
  //logo.style.transition = "transform 1s, opacity 1s";
  //logo.style.transform = "translateY(0)";
  //logo.style.opacity = "1";
});

/**
 * Funktion für den Demo-Login.
 * Diese Funktion setzt vordefinierte Demo-Anmeldeinformationen und leitet den Benutzer weiter zum Dashboard.
 */
function demoLogin() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Setzt Demo-Anmeldeinformationen
  emailInput.value = "demo@example.com";
  passwordInput.value = "demopassword";

  // Weiterleitung zur Dashboard-Seite
  window.location.href = "dashboard.html";
}

/**
 * Funktion, die das Anmeldeformular validiert und abschickt.
 * @param {Event} event - Das Ereignis, das ausgelöst wird, wenn das Formular abgeschickt wird.
 */
function handleSubmit(event) {
  event.preventDefault(); // Verhindert das Standard-Formularabsendeverhalten

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (validateEmail(email) && validatePassword(password)) {
    // Fiktive Authentifizierung - hier würde normalerweise eine API-Anfrage gesendet
    if (email === "user@example.com" && password === "password") {
      window.location.href = "dashboard.html"; // Weiterleitung nach erfolgreicher Anmeldung
    } else {
      alert("Falsche Anmeldeinformationen");
    }
  } else {
    alert("Bitte geben Sie eine gültige E-Mail-Adresse und ein Passwort ein");
  }
}

/**
 * Funktion zur Validierung der E-Mail-Adresse.
 * @param {string} email - Die zu validierende E-Mail-Adresse.
 * @returns {boolean} - True, wenn die E-Mail-Adresse gültig ist, andernfalls false.
 */
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Funktion zur Validierung des Passworts.
 * @param {string} password - Das zu validierende Passwort.
 * @returns {boolean} - True, wenn das Passwort gültig ist, andernfalls false.
 */
function validatePassword(password) {
  // Beispielhafte Passwortvalidierung: mindestens 8 Zeichen
  return password.length >= 8;
}

// Event-Listener für das Absenden des Formulars
document.querySelector("form").addEventListener("submit", handleSubmit);

// Event-Listener für den Demo-Login
//document.querySelector(".demo-login button").addEventListener("click", demoLogin);

function init() {
  document.getElementById("logo-container").classList.remove("start");
  document.getElementById("myBody").style.background = "white";
  setTimeout(showLoginContainer, 2000);
}

function showLoginContainer() {
  document.getElementById("main_wrapper").classList.remove("d-none");
  document.getElementById("login_section").classList.remove("d-none");
}

function onPasswordKeyDown() {
  let inputField = document.getElementById("userPassword").value;
  let pressedKey = event.key;

  if (inputField.length <= 1 && pressedKey == "Backspace") {
    document.getElementById("loginButton").disabled = true;
  } else if (pressedKey == "Enter") {
    if (inputField.length > 0) {
      document.getElementById("loginButton").disabled = false;
    }
  } else if (isMarkedCompletely(document.getElementById("userPassword")) && (pressedKey == "Backspace" || pressedKey == "Delete")) {
    document.getElementById("loginButton").disabled = true;
  } else {
    if (checkInvalidKeys(pressedKey) == false) {
      document.getElementById("loginButton").disabled = false;
    }
  }
}

function checkInvalidKeys(key) {
  switch (key) {
    case "Backspace":
    case "Escape":
    case "Shift":
    case "Alt":
    case "AltGraph":
    case "Space":
    case "Control":
    case "F1":
    case "F2":
    case "F3":
    case "F4":
    case "F5":
    case "F6":
    case "F7":
    case "F8":
    case "F9":
    case "F10":
    case "F11":
    case "F12":
    case "PageUp":
    case "PageDown":
    case "Home":
    case "End":
    case "Insert":
    case "Meta":
    case "ContextMenu":
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
    case "LaunchApplication2":
    case "LaunchMail":
    case "NumLock":
    case "Pause":
    case "ScrollLock":
      return true;
      break;
    default:
      return false;
      break;
  }
}

function isMarkedCompletely(inputField) {
  return inputField.selectionStart == 0 && inputField.selectionEnd == inputField.value.length;
}