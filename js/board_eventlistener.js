let isEditFormOpened = false;
let cardIsOpened = false;


/**
 * Resets the edit form state to its default (closed) state.
 */
function setEditFormOpenedToFalse() {
  isEditFormOpened = false;
}


/**
 * Handles closing of the card or edit form when an outside area is clicked, 
 * depending on the current state of the card or form.
 */
function handleOpenCardContainerClick() {
    if (isEditFormOpened) {
      closeCard();
      clearForm("assigned-contacts-popup", "subTasks-popup");
      removeListeners("add-contact-input");
    } else if (cardIsOpened) {
      closeCard();
    }
    
    setEditFormOpenedToFalse();
    cardIsOpened = false;
  }