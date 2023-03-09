let subMenu;
let form;

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
}

/**
 * Closes the modal form when canceled
 */
function closeOrderForm() {
  form.scrollTo(0, 0);
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
