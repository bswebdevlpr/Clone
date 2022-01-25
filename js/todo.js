const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");


function onTodoSubmit(event){
    event.preventDefault();
    
    const newTodo = todoInput.value;
    todoInput.value = "";

    createLi(newTodo);
    updateTodoListInDB(OPTION_ADD, newTodo);
}

function createLi(newTodo){
    const li = document.createElement("li");

    const span = document.createElement("span");
    const deleteButton = document.createElement("button");
    
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", onDeleteButton);

    span.innerText = newTodo + " ";
    span.appendChild(deleteButton);
    li.appendChild(span);
    todoList.appendChild(li);
}

function onDeleteButton(event){
    let contents = event.target.parentElement.innerText;
    contents = contents.substr(0, contents.length - 2);
    updateTodoListInDB(OPTION_DEL, contents);

    event.target.parentElement.parentElement.remove();
}

const OPTION_ADD = 0;
const OPTION_DEL = 1;

function updateTodoListInDB(opt, Todo){
    // opt
    // 0 - push
    // 1 - pop
    switch (opt) {
        case OPTION_ADD:
            new_todoList.push(Todo);
            localStorage.setItem("todo_list", JSON.stringify(new_todoList));
            break;

        case OPTION_DEL:
            if(new_todoList.length === 0) break;

            const delIndex = new_todoList.indexOf(Todo);
            var temp_list = [];

            for (var i=0; i < new_todoList.length; i++){
                if (i === delIndex) continue;
                temp_list.push(new_todoList[i]);
            }
            
            new_todoList.splice(0);
            for (var i=0; i < temp_list.length; i++){
                new_todoList.push(temp_list[i]);
            }

            localStorage.setItem("todo_list", JSON.stringify(new_todoList));
            break;
    
        default:
            break;
    }
}

todoForm.addEventListener("submit", onTodoSubmit);

let db_todoList = localStorage.getItem("todo_list");
let new_todoList = [];

if (db_todoList === null){
    console.log("In DB, to-do list is empty.");
} else {
    db_todoList = JSON.parse(db_todoList);
    db_todoList.forEach(element => {
        createLi(element);
    });
    new_todoList = db_todoList;
}