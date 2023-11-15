import taskArr from "./data.js";

// DOM Elements
const invoiceServicesEl = document.querySelector('.invoice-services')
const invoiceCustomServicesEl = document.querySelector('.invoice-custom-services')
const invoiceTaskList = document.querySelector('.invoice-task-list')
const invoiceTotalDisplay = document.querySelector('.invoice-total-display')
const invoiceCustomServiceBtn = document.querySelector('.invoice-custom-service-button')
const invoiceCustomServiceTitle = document.querySelector('.invoice-custom-service-title')
const invoiceCustomServicePrice = document.querySelector('.invoice-custom-service-price')
const exitCustomServiceBtn = document.querySelector('.fa-solid')
const sendInvoiceBtn = document.querySelector('.send-invoice-button')

let currentTasks = []
let totalPrice = 0
let maxCustomPrice = 1001

// Exits out of the custom task menu
exitCustomServiceBtn.addEventListener('click', toggleCustomTask)

// Send Invoice Button - This clears everything
sendInvoiceBtn.addEventListener('click', function() {
    currentTasks = []
    totalPrice = 0
    updatePrice()
    invoiceTaskList.innerHTML = ''
})

// Setup for custom task
invoiceCustomServiceBtn.addEventListener('click', function() {
    if (invoiceCustomServicePrice.value && invoiceCustomServiceTitle.value && invoiceCustomServicePrice.value < maxCustomPrice) {
        let newTask = {
        name: invoiceCustomServiceTitle.value,
        price: parseInt(invoiceCustomServicePrice.value),
        }
        currentTasks.push(newTask)
        totalPrice += newTask.price
        updatePrice()
        invoiceTaskList.innerHTML += `
        <li class='invoice-task-items'>
            <div>${newTask.name}</div>
            <div class='invoice-task-item-price'>$${newTask.price}</div>
        </li`
        invoiceCustomServicePrice.value = ''
        invoiceCustomServiceTitle.value = ''
    } else {
        alert('Task must be filled out and number must be 1-1000')
    }
})

// Creates tasks based off of the taskArr
function createTaskButtons() {
    for (let task of taskArr) {
        let taskBtn = document.createElement('button');
        taskBtn.textContent = `${task.name}: $${task.price}`;
        taskBtn.classList.add('invoice-services-button')
        taskBtn.addEventListener('click', function() { 
            addTaskToInvoice(task);
            this.classList.remove('invoice-services-button')
            this.classList.add('gray-background')
         });
        invoiceServicesEl.appendChild(taskBtn);
    }
    let customtaskBtn = document.createElement('button');
    customtaskBtn.textContent = `Custom...`;
    customtaskBtn.classList.add('invoice-services-button')
    customtaskBtn.addEventListener('click', toggleCustomTask);
    invoiceServicesEl.appendChild(customtaskBtn)

}
createTaskButtons()

// When a non-custom task is clicked on, it will add that task to the invoice list
function addTaskToInvoice(task) {
    if (!currentTasks.includes(task)) {
        currentTasks.push(task)
        totalPrice += task.price
    }
    invoiceTaskList.innerHTML = ''
    currentTasks.forEach(item => {
        invoiceTaskList.innerHTML += `
        <li class='invoice-task-items'>
            <div>${item.name}</div>
            <div class='invoice-task-item-price'>$${item.price}</div>
        </li>`
    })
    updatePrice()
}

// show/hides custom task menu
function toggleCustomTask() {
    invoiceServicesEl.classList.toggle('display-none');
    invoiceCustomServicesEl.classList.toggle('display-none');
}

function updatePrice() {
    invoiceTotalDisplay.innerHTML = `$${totalPrice}`
}