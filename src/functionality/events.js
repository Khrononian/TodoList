import { taskLocater, addProjects, dateCheck } from "./render";
import { format } from "date-fns";

const projectBtn = document.querySelector(".project");
const projectCanel = document.querySelector(".cancel-btn");
const projectInput = document.querySelector(".project-input");
const projectForm = document.querySelector(".project-form");
const taskForm = document.querySelector(".task-form");
const taskBtn = document.querySelector(".task");
const taskCancel = document.querySelector(".cancel-task");
const taskInput = document.querySelector(".task-input");
const dateForm = document.querySelector(".date-form");
const dateCancel = document.querySelector(".cancel-date");
const dateInput = document.querySelectorAll(".date-time");
let dateTime;

(function eventListeners() {
    projectForm.onsubmit = event => {
        event.preventDefault();

        addProjects(projectInput);
    }
    taskForm.onsubmit = event => {
        event.preventDefault();
        
        taskLocater();
    }
    dateForm.onsubmit = event => {
        const dates = document.querySelectorAll(".date-time");
        
        event.preventDefault()
        for (let i = 0; i < dates.length; i++) {
            if (dates[i].value == "true") {
                dates[i].innerText = format(dateTime, "MMM-dd-yyyy");
                dateCheck(dates[i])
                dates[i].value = false;
            }
        }
        event.target.style.display = "none";
        dateForm.value = "";
    }
    document.querySelector(".date-input").addEventListener("change", element => {
        dateTime = new Date(element.target.value);
    })
    dateInput.forEach(e => e.addEventListener("click", dateAdd));
    taskBtn.addEventListener("click", () => taskForm.style.display = "block");
    projectBtn.addEventListener("click", event => {
        projectForm.style.display = "block"
    })
    taskCancel.addEventListener("click", event => {
        event.preventDefault();
        taskForm.style.display = "none"
        taskInput.value = "";
    });
    dateCancel.addEventListener("click", event => {
        event.preventDefault();
        document.querySelector(".date-input").value = "";
        dateForm.style.display = "none"
        dateTime = "";
    })
    projectCanel.addEventListener("click", event => {
        event.preventDefault();
        projectInput.value = "";
        projectForm.style.display = "none";
    });
})()

function dateAdd(event) {
    dateForm.style.display = "block";
    document.querySelector(".date-input").value = "";
    event.target.value = true;
}

function domLists() {
    const listForm = document.querySelector(".list-form");
    
    document.querySelectorAll(".list-btn").forEach(e => e.addEventListener("click", event => {
        const listBtns = document.querySelectorAll(".list-btn");
        const todoList = document.querySelectorAll(".todo-list");

        for (let i = 0; i < listBtns.length; i++) {
            if (event.target.innerText == listBtns[i].innerText) {
                listBtns[i].style.background = "grey";
                listForm.id = `${event.target.innerText}`;
                for (let j = 0; j < todoList.length; j++) {
                    if (event.target.value == todoList[j].id) {
                        todoList[j].style.display = "block"; 
                        taskBtn.style.display = "block";
                    } else if (event.target.value == "Today" || event.target.value == "Upcoming") {
                        taskBtn.style.display = "none";
                        todoList[j].style.display = "none";
                    } else {
                        todoList[j].style.display = "none";
                        taskBtn.style.display = "block";
                    }
                }
            } else listBtns[i].style.background = "#EFEFEF";
            if (event.target.innerText == listForm.id) listForm.querySelector("h2").innerText = event.target.value;
            if (document.querySelector(".list-head").innerText == "Upcoming") taskBtn.style.display = "none";
        }
    }))
}

export { domLists, projectForm, taskForm, taskInput, projectInput, dateAdd, dateTime }
