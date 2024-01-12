/**
 * Updates and synchronizes a task's properties based on edited values. Retrieves updated details, 
 * replaces the task in the 'tasks' array, saves to backend, and refreshes the task board.
 * 
 * @param {number} taskIndex - Index of the task in the 'tasks' array.
 * @param {string} context - Context affecting task value retrieval.
 */
function acceptAndSetEditOfTask(taskIndex, context) {
  let isValidTitle = validateField("task-title-input-popup", "requiredTextTitle");
  let isValidDescription = validateField("task-description-textarea-popup", "requiredTextDescription");
  let isValidDueDate = validateField("due-date-input-popup", "requiredTextDueDate");

  if (isValidTitle && isValidDescription && isValidDueDate) {
    let updatedTask = getValuesAfterEdit(taskIndex, context);
    tasks[taskIndex] = updatedTask;

    setItem('tasks', tasks).then(() => {
      closeWindowAfterSavingEdit();
      loadBoard();
    });
  }
}


/**
 * Updates task details based on user input for a specific context (e.g., main page, popup).
 * It gathers the task title, description, assigned contacts, due date, priority, category,
 * current subtasks, completed subtasks, and task state.
 *
 * @param {number} taskId - ID of the task to update.
 * @param {string} [context="main"] - Context of the task editing (determines input source).
 * @returns {Object} Updated task object.
 */
function getValuesAfterEdit(taskId, context = "main") {
  return {
    "id": taskId,
    "taskTitle": getTaskTitle(context),
    "description": getTaskDescription(context),
    "assignedTo": getAssignedContacts(),
    "dueDate": getDueDate(context),
    "priority": getPriority(),
    "category": getCategoryOfTask(taskId),
    "subtasks": getSubtask(),
    "subtasksDone": getSubtasksDone(taskId),
    "state": getTaskState(taskId),
  };
}


/**
 * Closes the edit task window and updates the task board view.
 * It triggers functions to close the edit window, sort tasks on the board,
 * clear form fields in the popup, and remove event listeners from the add-contact input.
 */
function closeWindowAfterSavingEdit() {
  closeCard();
  renderTasks();
  clearForm('assigned-contacts-popup', 'subTasks-popup');
  removeListeners('add-contact-input');
}


/**
 * Retrieves the current state of a task based on its index in the tasks array.
 * 
 * @param {number} taskIndex - The index of the task in the tasks array.
 * @returns {string} The state of the task (e.g., 'InProgress', 'Done', 'ToDo').
 */
function getTaskState(taskIndex) {
  let stateOfTask = tasks[taskIndex].state;
  return stateOfTask;
}


/**
 * Retrieves a list of completed subtasks for a specific task identified by its index.
 *
 * @param {number} taskIndex - The index of the task in the tasks array.
 * @returns {Array} An array containing the completed subtasks of the specified task.
 */
function getSubtasksDone(taskIndex) {
  let subtasksDoneOfTask = tasks[taskIndex].subtasksDone;
  return subtasksDoneOfTask;
}


/**
 * Sets the values in the edit card based on the task's existing data.
 * This function updates the title, description, due date, subtasks, and priority fields
 * in the edit card with the current values of the specified task.
 *
 * @param {number} taskIndex - The index of the task in the tasks array.
 * @param {string} SubTasksDiv - The ID of the HTML element where the subtasks will be displayed.
 */
function setValuesInEditCard(taskIndex, SubTasksDiv) {
  let openTask = tasks[taskIndex];
  let openTaskTitle = document.getElementById('task-title-input-popup');
  openTaskTitle.value = openTask.taskTitle;
  let openTaskDescription = document.getElementById("task-description-textarea-popup");
  openTaskDescription.value = openTask.description;
  let openTaskDate = document.getElementById("due-date-input-popup");
  if (openTask.dueDate) {
    let formattedDate = formatDateToInput(openTask.dueDate);
    openTaskDate.value = formattedDate;
  }
  createSubtaskList(taskIndex, SubTasksDiv);
  setSubtasksOfTask(taskIndex);
  setTaskPriorityInEditWindow(taskIndex);
}


/**
 * Updates the global `subtasks` array with the subtasks of a specific task.
 * This function clears the existing `subtasks` array and then sets it to the subtasks
 * of the task specified by the given index.
 *
 * @param {number} taskIndex - The index of the task in the tasks array whose subtasks are to be set.
 */
function setSubtasksOfTask(taskIndex) {
  subtasks = [];
  let subTasksOfTask = tasks[taskIndex].subtasks;
  subtasks = subTasksOfTask;
}


/**
 * Retrieves the category of a specific task based on its index in the tasks array.
 * This function accesses the tasks array and returns the category of the task at the given index.
 *
 * @param {number} taskIndex - The index of the task in the tasks array.
 * @returns {string} The category of the specified task.
 */
function getCategoryOfTask(taskIndex) {
  let categoryOfTaskToEdit = tasks[taskIndex].category;
  return categoryOfTaskToEdit;
}


/**
 * Converts a date string from the format 'yyyy-mm-dd' to 'dd/mm/yyyy'.
 * This function splits the input string by the '-' delimiter and rearranges the date parts.
 * If the input string does not conform to the expected format, it returns an empty string.
 *
 * @param {string} dateString - The date string in 'yyyy-mm-dd' format.
 * @returns {string} The converted date string in 'dd/mm/yyyy' format or an empty string if the input is not valid.
 */
function formatDateFromInput(dateString) {
  let parts = dateString.split('-');
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : '';
}


/**
 * Konvertiert ein Datum vom Format 'dd/mm/yyyy' in das Format 'yyyy-mm-dd'.
 *
 * @param {string} dateString - Das Datum im Format 'dd/mm/yyyy'.
 * @returns {string} Das Datum im Format 'yyyy-mm-dd'.
 */
function formatDateToInput(dateString) {
  let parts = dateString.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  } else {
    return '';
  }
}


/**
 * Populates the specified container with a list of subtasks for a given task.
 * Iterates through the subtasks array of a specific task and adds each subtask to the container.
 * It uses the `generateSubtaskHTML` function to create HTML content for each subtask.
 *
 * @param {number} taskIndex - The index of the task in the global `tasks` array.
 * @param {string} SubTasksDiv - The ID of the HTML container where subtasks will be displayed.
 */
function createSubtaskList(taskIndex, SubTasksDiv) {
  const subtaskContainer = document.getElementById(SubTasksDiv);
  subtaskContainer.innerHTML = "";

  for (let j = 0; j < tasks[taskIndex].subtasks.length; j++) {
    subtasks.push(tasks[taskIndex].subtasks[j]);
    const subtask = subtasks[j];
    subtaskContainer.innerHTML += generateSubtaskHTML(subtask, j, SubTasksDiv);
  }
}


/**
 * Sets the selected state of contacts assigned to a task in a specific container.
 * Iterates over the assigned contacts of a task and updates their selected state in the UI.
 * It finds each assigned contact in the global contacts array and triggers a click event handler
 * to visually indicate their selected state in the specified container.
 *
 * @param {number} i - The index of the task in the global `tasks` array.
 * @param {string} container - The ID of the HTML container where contact states will be updated.
 */
function setClickedContacts(i, container) {
  let assignedContacts = tasks[i].assignedTo;

  clickedStates = Array(contacts.length).fill(false);

  assignedContacts.forEach(assignedContact => {
    let contactIndex = contacts.findIndex(contact => contact.id === assignedContact.id);
    if (contactIndex !== -1) {
      handleClickOnAssignedContact(contactIndex, container);
    }
  });
}


/**
 * Sets the priority of a task in the edit window.
 * Finds the task by its ID in the global `tasks` array and sets its priority in the UI.
 * The function retrieves the task's priority and calls `setPrio` to update the UI accordingly.
 *
 * @param {number} taskId - The unique ID of the task whose priority needs to be set.
 */
function setTaskPriorityInEditWindow(taskId) {
  let task = tasks.find(t => t.id === taskId);

  if (task) {
    let priority = task.priority;
    setPrio(priority);
  }
}