/**
 * Sets the priority for a task and updates the UI accordingly.
 * 
 * @param {string} prio - The priority level (e.g., 'urgent', 'medium', 'low').
 */
function setPrio(prio) {
  clickedPriority = prio;
  resetPriorityClasses();

  const elementId = `${prio}Btn`;
  switchButtonColor(elementId, prio);

  let imgId = document.getElementById(`${prio}Symbol`);
  const imagePath = `./assets/img/Desktop/add-task/priority_icons/${prio}_white.svg`;
  changeSrc(imgId, imagePath);
}


/**
 * Toggles the color of a button based on its priority class.
 * 
 * @param {string} elementId - The ID of the button element.
 * @param {string} elementClass - The class name representing the priority level.
 */
function switchButtonColor(elementId, elementClass) {
  const element = document.getElementById(elementId);

  if (element.classList.contains(elementClass)) {
    removeClass(element, elementClass);
  } else {
    assignClass(element, elementClass);
  }
}


/**
 * Resets the visual styles of all priority buttons to their default state.
 */
function resetPriorityClasses() {
  let priorities = ["urgent", "medium", "low"];

  for (let i = 0; i < priorities.length; i++) {
    let prio = priorities[i];
    let elementId = `${prio}Btn`;
    let imgId = `${prio}Symbol`;

    removeClass(document.getElementById(elementId), prio);
    const imgElement = document.getElementById(imgId);
    const imagePath = `./assets/img/Desktop/add-task/priority_icons/${prio}.svg`;
    changeSrc(imgElement, imagePath);
  }
}


/**
 * Sets the standard priority visually always to "medium"
 */
function addstandardPrioMedium () {
  let standardBtn = document.getElementById('mediumBtn');
  standardBtn.classList.add('medium');

  let mediumSymbol = document.getElementById('mediumSymbol');
  mediumSymbol.src = `./assets/img/Desktop/add-task/priority_icons/medium_white.svg`;
}