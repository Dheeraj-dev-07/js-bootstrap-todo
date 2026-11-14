

const addTaskBtn = document.getElementById("add-task-btn");

const taskInput = document.getElementById("task-input");

const tableData = document.getElementById("table-data");

const searchInput = document.getElementById("search-input");

const searchForm = document.getElementById("search-task");


let userTaskData = JSON.parse(localStorage.getItem("tasks")) || [];



function saveToLocalStorage() {


    localStorage.setItem(
        "tasks",
        JSON.stringify(userTaskData)
    );

}



addTaskBtn.addEventListener("click", addTask);


function addTask() {



    let taskValue = taskInput.value.trim();



    if (taskValue === "") {

        alert("Please enter your task!");

        return;
    }



    const newTask = {


        id: Date.now(),


        title: taskValue,


        status: "Pending"

    };



    userTaskData.push(newTask);



    saveToLocalStorage();



    renderTasks();



    taskInput.value = "";

}




function renderTasks(filteredTasks = userTaskData) {


    tableData.innerHTML = "";



    if (filteredTasks.length === 0) {

        const row = document.createElement("tr");

        const cell = document.createElement("td");

        cell.colSpan = 4;

        cell.className = "text-center text-muted";

        cell.textContent = "No tasks found!";

        row.appendChild(cell);

        tableData.appendChild(row);

        return;
    }



    filteredTasks.forEach((task, index) => {


        const row = document.createElement("tr");



        const numberCell = document.createElement("th");

        numberCell.scope = "row";

        numberCell.textContent = index + 1;



        const titleCell = document.createElement("td");

        titleCell.textContent = task.title;



        const statusCell = document.createElement("td");

        statusCell.className = "text-center";



        const statusBadge = document.createElement("span");

        statusBadge.className = task.status === "Completed"
            ? "badge rounded-pill bg-success"
            : "badge rounded-pill bg-warning";

        statusBadge.textContent = task.status;

        statusCell.appendChild(statusBadge);


        // Configuration buttons ka cell

        const configCell = document.createElement("td");

        configCell.className = "text-center";


        // Buttons container

        const buttonContainer = document.createElement("div");

        buttonContainer.className =
            "d-flex justify-content-center gap-2";



        const deleteBtn = document.createElement("button");

        deleteBtn.type = "button";

        deleteBtn.className = "btn btn-danger btn-sm";

        deleteBtn.textContent = "Delete";

        deleteBtn.dataset.id = task.id;

        deleteBtn.dataset.action = "delete";


        // Update button

        const updateBtn = document.createElement("button");

        updateBtn.type = "button";

        updateBtn.className = "btn btn-secondary btn-sm";

        updateBtn.textContent = "Update";

        updateBtn.dataset.id = task.id;

        updateBtn.dataset.action = "edit";



        const statusBtn = document.createElement("button");

        statusBtn.type = "button";

        statusBtn.className = "btn btn-primary btn-sm";

        statusBtn.textContent = task.status === "Pending"
            ? "Complete"
            : "Pending";

        statusBtn.dataset.id = task.id;

        statusBtn.dataset.action = "status";



        buttonContainer.append(
            deleteBtn,
            updateBtn,
            statusBtn
        );



        configCell.appendChild(buttonContainer);



        row.append(
            numberCell,
            titleCell,
            statusCell,
            configCell
        );



        tableData.appendChild(row);

    });

}



tableData.addEventListener("click", function (event) {


    const clickedButton = event.target.closest("button[data-action]");



    if (!clickedButton) return;



    const taskId = Number(clickedButton.dataset.id);

    const action = clickedButton.dataset.action;



    const selectedTask = userTaskData.find(
        task => task.id === taskId
    );



    if (!selectedTask) return;



    if (action === "delete") {


        userTaskData = userTaskData.filter(
            task => task.id !== taskId
        );

    }



    else if (action === "edit") {


        const updatedValue = prompt(
            "Update your task:",
            selectedTask.title
        );


        // Cancel click hone par kuch change nahi hoga

        if (updatedValue === null) return;



        if (updatedValue.trim() === "") {

            alert("Task cannot be empty!");

            return;
        }



        selectedTask.title = updatedValue.trim();

    }



    else if (action === "status") {


        selectedTask.status =
            selectedTask.status === "Pending"
                ? "Completed"
                : "Pending";

    }



    saveToLocalStorage();



    renderTasks();

});


searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    searchTasks();

});



searchInput.addEventListener("input", searchTasks);


function searchTasks() {


    const searchValue = searchInput.value.toLowerCase().trim();


    const filteredTasks = userTaskData.filter(task =>

        task.title.toLowerCase().includes(searchValue)

    );



    renderTasks(filteredTasks);

}

renderTasks();
