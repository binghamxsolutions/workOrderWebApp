function showSubMenu() {
  subMenu = document.getElementById("menu");
  subMenu.style.display = "grid";
  subMenu.focus();
} //opens the sub-menu when in mobile view

function closeSubMenu() {
  subMenu = document.getElementById("menu");
  subMenu.style.display = "none";
} //closes the sub-menu when in mobile view

document.addEventListener('mouseup', function (click) {
  closeSubMenu();
}); /* checks for a click event and calls closeSubMenu
when the user clicks something */
// listener solution found on: https://www.techiedelight.com/hide-div-click-outside-javascript/
