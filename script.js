const taskInput = document.getElementById("task-input")
const addTaskBtn = document.getElementById("task-input-button")
const taskList = document.getElementById("task-list")

function addTask(){
    const taskText = taskInput.value.trim();

    if(taskText == ""){
        alert("Please enter a task");
        return;
    }   

const li =document.createElement("li");
li.textContent=taskText

li.addEventListener("click",function(){
    li.classList.toggle("completed");
});

li.addEventListener("contextmenu", function(e){
    e.preventDefault();
    li.remove();
})

taskList.appendChild(li);

taskInput.value = "";
}

addTaskBtn.addEventListener("click", addTask)