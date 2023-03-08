let form;

/**
 * Opens the modal form on request
 */
function openOrderForm() {
  form.style.display = "grid";
  //form.style.backdropFilter = "blur(10px)";
  form.style.backgroundColor = "#0007";
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
  * Checks for a click event and calls modal
  * when the user clicks something other than that item
 */
document.addEventListener('mouseup', function (click) {
  if (document.body.contains(form) && (click.target != form)) {
    closeOrderForm();
  } /* closes the form modal if and only if the form exists on the
  current page AND the selection was not in the form itself */
});
// listener solution found on: https://www.techiedelight.com/hide-div-click-outside-javascript/


window.onload = function () {
  setTimeout(function () {
    form = document.getElementById("modal");
    console.log("finished loading!");
  }, 1500);
}; //sets element accessor values one second after the page loads so the DOM can create them first
