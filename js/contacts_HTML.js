/**
 * Returns the requested HTML Code for the contact menu
 * 
 * @param {number} i - Index of the choosen contact
 * @returns - HTML Code as string
 */
function returnContactMenuHTML(i) {
    return /* html */ `
    <div class="contact-menu" onclick="doNotClose(event)">
    <div onclick="openEditContact(${i})">
        <img src="./assets/img/Desktop/contacts/edit.svg" alt="Edit">
        <span name="Edit">Edit</span>
    </div>
    <div onclick="deleteContact(${i})">
        <img src="./assets/img/Desktop/contacts/delete.svg" alt="Delete">
        <span name="Delete">Delete</span>
    </div>
</div>`;
}


/**
 * Returns the requested HTML Code for the contact list
 * 
 * @param {number} num - 0 for First-Letter HTML Code / 1 for Contact-User HTML Code
 * @param {string} letter - First letter of the name
 * @param {number} i - Index of the choosen contact
 * @param {string} color - Color of the contact icon
 * @param {string} initials - Initials for the first / first & last name
 * @param {string} name - First / First & last name
 * @param {string} email - Email adress
 * @returns - HTML Code as string
 */
function returnContactListHTML(num, letter, i, color, initials, name, email) {
    if (num == 0) {
        return /* html */ `
            <div class="letter">
                <span>${letter}</span>
            </div>
            <img class="border" src="./assets/img/Desktop/general_elements/bar/vector_gray_vertical.svg">`;
    } else if (num == 1) {
        return /* html */ `
            <div id="contact${i}" class="user" onclick="openContact(${i})">
                <div class="user-icon" style="background-color: ${color};">${initials}</div>
                <div class="username">
                    <span>${name}</span>
                    <a>${email}</a>
                </div>
            </div>`;
    }
}


/**
 * Returns HTML Code for the opened contact info
 * 
 * @param {string} color - Color of the contact icon
 * @param {string} initials - Initials for the first / first & last name
 * @param {string} name - First / First & last name
 * @param {string} email - Email adress
 * @param {string} phone - Phone number
 * @param {number} i - Index of the choosen contact
 * @returns - HTML Code as string
 */
function returnContactInfoHTML(color, initials, name, email, phone, i) {
    return /* html */ `<div class="info-title">
        <div class="user-icon icon-big noselect" style="background-color: ${color};">${initials}</div>
        <div class="info-name">
            <h2>${name}</h2>
            <div class="info-buttons noselect">
                <div onclick="openEditContact(${i})">
                    <img src="./assets/img/Desktop/contacts/edit.svg" alt="Edit">
                    <span name="Edit">Edit</span>
                </div>
                <div onclick="deleteContact(${i})">
                    <img src="./assets/img/Desktop/contacts/delete.svg" alt="Delete">
                    <span name="Delete">Delete</span>
                </div>
            </div>
        </div>
    </div>
    <h6>Contact Information</h6>
    <div class="info-me">
        <div>
            <h4>Email</h4>
            <a href="mailto:${email}">${email}</a>
        </div>
        <div>
            <h4>Phone</h4>
            <span>${phone}</span>
        </div>
    </div>
    <div onclick="openContactMenu(${i})" id="contact-menu-button" class="add-new-mobile">
        <img src="./assets/img/Mobile/contacts_mobile/more_vert.svg">
    </div>
    <div id="contact-menu" class="d-none" onclick="closeContactMenu()"> 

    </div>`;
}