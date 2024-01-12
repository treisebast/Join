/**
 * Generates HTML for each contact in the dropdown list for assigning contacts to a task.
 * It creates a div element for each contact with their name and a checkbox for selection.
 *
 * @param {Object} contact - The contact object containing name and color.
 * @param {number} index - The index of the contact in the contacts array.
 * @returns {string} - The HTML string for the contact div element.
 */
function generateAssignContactsHTML(contact, index, container) {
  const name = contact.name;
  return `
    <div class="contactDiv" id="contact${index}" onclick="handleClickOnAssignedContact(${index}, '${container}')">
        <div class="contactDiv-sub">
            <div class="contact-avatar" style="background-color: ${contact.color
    };">${getInitials(name)}</div>
            ${contact.name}
        </div>
        <img class="checkbox" id="checkbox${index}" src="./assets/img/Desktop/add-task/check_button.svg" alt="">
    </div>
    `;
}


/**
 * Creates HTML for each category option in the dropdown list for selecting a task category.
 * It generates a div element for each category option, making it selectable.
 *
 * @param {string} category - The category name.
 * @param {number} index - The index of the category in the categories array.
 * @returns {string} - The HTML string for the category div element.
 */
function generateCategoryOptionsHTML(category, index) {
  return `
      <div class="categoryDiv" id="categoryOption${index}" onclick="switchTaskCategoryClickedState('${index}')">${category}</div>
    `;
}


/**
 * Generates the HTML string for an avatar element based on the provided contact information.
 * It creates a div element representing the contact's avatar, styled with the contact's color
 * and initials derived from their name.
 *
 * @param {object} contact - The contact object containing the name and color.
 * @returns {string} - The HTML string for the avatar div element.
 */
function generateAvatar(contact) {
  return `
    <div class="contact-avatar" style="background-color: ${contact.color
    };">${getInitials(contact.name)}</div>
    `;
}


/**
 * Generates the HTML string for a subtask element. It creates a list item for the subtask
 * with options to edit or delete it. The function also sets up an input field for editing
 * the subtask, along with icons for saving or canceling the edit.
 *
 * @param {string} subtask - The text of the subtask.
 * @param {number} subtaskIndex - The index of the subtask, used for assigning unique IDs.
 * @param {string} SubTasksDiv - The ID of the container for subtasks.
 * @returns {string} - The HTML string for the subtask element, including editing controls.
 */
function generateSubtaskHTML(subtask, subtaskIndex, SubTasksDiv) {
  return /*HTML*/ `

<div class="subTask-Wrapper">

  <div class="subTaskDiv" id="subTaskDiv${subtaskIndex}" ondblclick="editSubtask(${subtaskIndex}, '${SubTasksDiv}')">
    <li id="task${subtaskIndex}" ondblclick="editSubtask(${subtaskIndex}, '${SubTasksDiv}')">${subtask}</li>
    <div class="subTask-subDiv" id="subTask-subDiv${subtaskIndex}">
    <img class="subTask-icons" id="editSubtaskSVG${subtaskIndex}" src="./assets/img/Desktop/add-task/subtasks_icons/edit.svg" alt="edit" onclick="editSubtask(${subtaskIndex}, '${SubTasksDiv}')">
      <div class="subtasks-Seperator">|</div>
      <img class="subTask-icons" id="deleteSVG${subtaskIndex}" src="./assets/img/Desktop/add-task/subtasks_icons/delete.svg" alt="delete" onclick="deleteSubtask(${subtaskIndex}, '${SubTasksDiv}')">
    </div>
  </div>

  <div class="edit-subtask-div d-none" id="edit-subtask-div${subtaskIndex}">
    <input type="text" class="editInput" id="editInput${subtaskIndex}">
    <div class="edit-subTask-subDiv" id="edit-subTask-subDiv${subtaskIndex}">
      <img class="subTask-icons" id="deleteEditSVG${subtaskIndex}" src="./assets/img/Desktop/add-task/subtasks_icons/delete.svg" alt="edit" onclick="deleteSubtask(${subtaskIndex}, '${SubTasksDiv}')">
      <div class="subtasks-Seperator">|</div>
      <img class="subTask-icons" id="saveSVG${subtaskIndex}" src="./assets/img/Desktop/add-task/subtasks_icons/check.svg" alt="delete" onclick="handleCheckClick(${subtaskIndex}, '${SubTasksDiv}')">
    </div>
  </div>
</div>

</div>

  `;
}