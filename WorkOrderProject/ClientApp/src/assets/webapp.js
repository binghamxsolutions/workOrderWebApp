let subMenu;
let form;

function showSubMenu() {
  subMenu.style.display = "grid";
} //opens the sub-menu when in mobile view

function closeSubMenu() {
  subMenu.style.display = "none";
} //closes the sub-menu when in mobile view


function openOrderForm() {
  form.style.display = "grid";
  body.style.backdropFilter = "blur(10px)";
  body.style.backgroundColor = "#0007";
}// opens the modal form on request
function closeOrderForm() {
  form.style.display = "none";
} // closes the modal form when canceled

document.addEventListener('mouseup', function (click) {
  if ((subMenu.style.display != "none")) {
    closeSubMenu();
  } // closes the subMenu only if it is already open

  if (document.body.contains(form) && (click.target != form)) {
    closeOrderForm();
  } /* closes the form modal if and only if the form exists on the
  current page AND the selection was not in the form itself */
});
/* checks for a click event and calls closeSubMenu or modal when the user clicks something other than that item*/
// listener solution found on: https://www.techiedelight.com/hide-div-click-outside-javascript/

window.onload = function () {
  setTimeout(function () {
    subMenu = document.getElementById("menu");
    form = document.getElementById("modal");
  }, 1000);
}; //sets element accessor values one second after the page loads so the DOM can create them first
