import taskArr from "./data.js";

const invoiceServicesEl = document.querySelector('.invoice-services')
const invoiceTaskList = document.querySelector('.invoice-task-list')

let currentTasks = []

function createTaskButtons() {
    for (let task of taskArr) {
        invoiceServicesEl.innerHTML += `
        <button>${task.name}: $${task.price}</button>`
    }
}

createTaskButtons()