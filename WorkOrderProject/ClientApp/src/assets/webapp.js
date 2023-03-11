let subMenu;
let form;
let contactField;

/**
 * Opens the sub-menu when in mobile view
 */
function showSubMenu() {
  subMenu = document.getElementById("menu");
  subMenu.style.display = "grid";
}

/**
 * Closes the sub-menu when in mobile view
 */
function closeSubMenu() {
  subMenu.style.display = "none";
}

/**
 * Opens the modal form on request
 */
function openOrderForm() {
  form = document.getElementById("modal");
  form.style.display = "grid";

  contactField = document.getElementById("contactName");
  contactField.focus(); // adds focus to the first field
}

/**
 * Adds a hyphen to the tel input for uniform formatting
 */
function hyphenate() {
  telField = document.getElementById("contactNumber");

  if (telField.value.length == 3 || telField.value.length == 7) {
    telField.value += "-";
  }
}

/**
 * Closes the modal form when canceled
 */
function closeOrderForm() {
  form.scrollTo(0, 0);
  contactField.blur();
  // ensures the form goes back to the top before closing
  form.style.display = "none";
}

document.body.addEventListener('mouseup', function () {
  if (document.body.contains(subMenu) && (subMenu.style.display == "grid")) {
    closeSubMenu();
  }
}); //closes the sub-menu if something else is selected

window.onload = function () {
  setTimeout(function () {
  }, 50);
}; //sets element accessor values one second after the page loads so the DOM can create them first
