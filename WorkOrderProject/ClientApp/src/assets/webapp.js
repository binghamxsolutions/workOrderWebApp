let subMenu;

/**
 * Opens the sub-menu when in mobile view
 */
function showSubMenu() {
  subMenu.style.display = "grid";
}

/**
 * Closes the sub-menu when in mobile view
 */
function closeSubMenu() {
  subMenu.style.display = "none";
}

window.onload = function () {
  setTimeout(function () {
    subMenu = document.getElementById("menu");
  }, 1500);
}; //sets element accessor values one second after the page loads so the DOM can create them first
