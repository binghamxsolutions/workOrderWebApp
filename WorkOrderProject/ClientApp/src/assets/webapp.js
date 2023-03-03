let subMenu;
let form;

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

/**
 * Opens the modal form on request
 */
function openOrderForm() {
  form.style.display = "grid";
  body.style.backdropFilter = "blur(10px)";
  body.style.backgroundColor = "#0007";
}

/**
 * Closes the modal form when canceled
 */
function closeOrderForm() {
  form.style.display = "none";
}

/**
 * Removes focus from the filter drop-down once a
 * change is made
 */
function colorFilter() {
  filter.blur();
}

/**
  * Checks for a click event and calls closeSubMenu or modal
  * when the user clicks something other than that item
 */
document.addEventListener('mouseup', function (click) {
  if (document.body.contains(subMenu) && (subMenu.style.display != "none")) {
    closeSubMenu();
  } // closes the subMenu only if it is already open and active in the DOM

  if (document.body.contains(form) && (click.target != form)) {
    closeOrderForm();
  } /* closes the form modal if and only if the form exists on the
  current page AND the selection was not in the form itself */
});
// listener solution found on: https://www.techiedelight.com/hide-div-click-outside-javascript/

window.onload = function () {
  setTimeout(function () {
    subMenu = document.getElementById("menu");
    form = document.getElementById("modal");
  }, 1000);
}; //sets element accessor values one second after the page loads so the DOM can create them first
