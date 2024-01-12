/**
 * Initializes the summary.html
 */
async function initSummary() {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        await playGreetingAni();
    }
    await setTasks();
    renderSummaryBoard();
    renderSummaryGreeting();
}


/**
 * Loads the tasks-array from Back End
 */
async function setTasks() {
    let tasksToSet = await getTasksArray();
    if (Array.isArray(tasksToSet)) {
        tasks = tasksToSet;
    } else {
        tasks = [];
    };
}


/**
 * Replaces the numbers and "urgent"/deadline box
 */
function renderSummaryBoard() {
    document.getElementById('toDoNum').innerHTML = findTaskQuantitys('state', 'ToDo');
    document.getElementById('doneNum').innerHTML = findTaskQuantitys('state', 'Done');
    document.getElementById('urgentNum').innerHTML = findTaskQuantitys('priority', 'urgent');
    renderDeadlineBox();
    document.getElementById('tasksNum').innerHTML = tasks.length;
    document.getElementById('inProgressNum').innerHTML = findTaskQuantitys('state', 'InProgress');
    document.getElementById('awaitFeedbackNum').innerHTML = findTaskQuantitys('state', 'AwaitFeedback');
}


/**
 * Gets the daytime and displays a daytime specific greeting with the username or guest
 */
function renderSummaryGreeting() {
    let greet = document.getElementById('greeting');

    let time = new Date();
    time = time.getHours();

    if (time < 12 && time > 4) {
        greet.firstElementChild.innerHTML = 'Good morning,';
    } else if (time < 18 && time > 12) {
        greet.firstElementChild.innerHTML = 'Good afternoon,';
    } else if (time < 24 || time < 4) {
        greet.firstElementChild.innerHTML = 'Good evening,';
    };
    loadUserGreeting(greet);
}


/**
 * Displays the name of the registered user in the greeting or leaves it blank
 * 
 * @param {element} greet - Greeting DOM HTML Element
 */
async function loadUserGreeting(greet) {
    let nameElement = greet.lastElementChild;
    let timeElement = greet.firstElementChild;
    try {
        let currentUser = JSON.parse(await getItem("currentUser"));
        if (!currentUser['name']) {
            nameElement.remove();
            timeElement.innerHTML = timeElement.innerHTML.slice(0, -1);
        } else {
            nameElement.innerHTML = currentUser['name'];
        };
    } catch (e) {
        console.error("Loading error:", e);
    };
}


/**
 * Plays the greeting animations and then disappears
 */
async function playGreetingAni() {
    let animationPlayed = await localStorage.getItem("greetingAniPlayed");
    let greeting = document.getElementById('greeting').parentNode;
    if (!animationPlayed) {
        greeting.firstElementChild.firstElementChild.innerHTML = 'Good day';
        greeting.classList.remove('d-none');
        setTimeout(function () {
            greeting.classList.add('d-none');
        }, 1600);
        localStorage.setItem("greetingAniPlayed", "true");
    } else {
        greeting.classList.add('d-none');
    };
}


/**
 *  Searches in the tasks-array for matches in the subcategory
 * 
 * @param {string} subcategory - JSON Key in tasks-array 
 * @param {string} match - JSON Value in tasks-array
 * @returns - count of matches
 */
function findTaskQuantitys(subcategory, match) {
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];

        if (element[subcategory] == match) {
            count++;
        }
    };
    return count;
}


/**
 * Replaces the date in the deadline box
 */
function renderDeadlineBox() {
    let dates = [];
    let today = new Date();
    let deadlineDate = document.getElementById('deadlineDate');

    for (let i = 0; i < tasks.length; i++) {
        let dateParts = tasks[i]['dueDate'].split('/');
        let taskDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        if (taskDate > today) {
            dates.push(tasks[i]['dueDate']);
        }
    };

    if (dates.length >= 1) {
        deadlineDate.innerHTML = sortDates(dates);
    } else {
        deadlineDate.innerHTML = 'No upcoming deadlines';
    };
}


/**
 * Sorts Dates from closest to farthest and formats it in 'month DD, YYYY'
 * 
 * @param {array} dates - Array with all dates of tasks seperated
 * @returns - formatted closest date to today
 */
function sortDates(dates) {
    dates.sort((a, b) => convertToDate(a) - convertToDate(b));

    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    return convertToDate(dates[0]).toLocaleDateString('en-US', options);
}


/**
 * Formats date to be compatible with javascript date methods
 * 
 * @param {string} dateString - date as a string
 * @returns formatted date
 */
function convertToDate(dateString) {
    let [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}