class Todo {
    constructor(content) {
        this.id = Date.now();
        this.content = content;
        this.completed = false;
    }
}
 
/************************* STORAGE *************************/
async function getTodos() {
    let entries = await JSON.parse(localStorage.getItem("todos"));
    // console.log(entries);
    if (entries !== null) {
        return entries;
    } else {
        return [];
    }
}

async function createEntry(todo) {
    let entries = await getTodos();
    entries.push(todo);
    localStorage.setItem("todos", JSON.stringify(entries));
}

async function completeEntry(id) {
    let entries = await getTodos();
    let i = entries.findIndex(todo => todo.id === id);
    if (i !== -1) {
        // toggle value of completed
        entries[i].completed = !entries[i].completed;
        localStorage.setItem("todos", JSON.stringify(entries));
    } else {
        showError("404: Todo not found! Could not change status of todo.");
    }
}

async function deleteEntry(id) {
    let entries = await getTodos()
    entries = entries.filter(todo => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(entries));
}

/************************* UTILITIES *************************/
async function addTodo(newTodo) {
    let content = newTodo;
    if (content === '' || content === null) {
        showError("New todos must have content!");
    } else {
        await createEntry(new Todo(content));
    }
    document.getElementById("new_task_name").value = "";
    await showActive();
}

async function completeTodo(event) {
    await completeEntry(event.currentTarget.todo_id);
    await showActive();
}

async function deleteTodo(event) {
    document.getElementById(event.currentTarget.todo_id).remove();
    await deleteEntry(event.currentTarget.todo_id);
    await showActive();
}

function displayTodo(todo) {
    // create todo row
    let row = document.createElement("div");
    row.setAttribute("class", "todo_item");
    row.setAttribute("id", todo.id);

    // create completed checkbox
    let completed = document.createElement("button");
    completed.setAttribute("class", "complete-btn");
    completed.onclick = completeTodo;
    completed.todo_id = todo.id;
    if (todo.completed) {
        completed.innerText = "X";
    }
    
    // create content div
    let content = document.createElement("div");
    content.setAttribute("class", "todo-content");
    content.innerText = todo.content;
    
    // create delete button
    let del = document.createElement("button");
    del.setAttribute("class", "delete-btn");
    del.onclick = deleteTodo;
    del.todo_id = todo.id;
    del.innerText = "X";

    // add to row
    row.appendChild(completed);
    row.appendChild(content);
    row.appendChild(del);

    // display in list
    document.getElementById("todo_list").appendChild(row);
}

/************************* FILTERS *************************/
async function showAll() {
    document.getElementById("todo_list").innerHTML = "";
    let todos = await getTodos();
    if (todos !== null) {
        showCount(`${todos.length} tasks`);
        if (todos.length > 0) {
            todos.forEach(todo => {
                displayTodo(todo);
            });
        }
    }
}

async function showActive() {
    document.getElementById("todo_list").innerHTML = "";
    let todos = await getTodos();
    todos = todos.filter(todo => !todo.completed);
    if (todos !== null) {
        showCount(`${todos.length} tasks remaining`);
        if (todos.length > 0) {
            todos.forEach(todo => {
                displayTodo(todo);
            });
        }
    }
}

async function showCompleted() {
    document.getElementById("todo_list").innerHTML = "";
    let todos = await getTodos();
    todos = todos.filter(todo => todo.completed);
    if (todos !== null) {
        showCount(`${todos.length} tasks completed`);
        if (todos.length > 0) {
            todos.forEach(todo => {
                displayTodo(todo);
            });
        }
    }
}

function showCount(message) {
    document.getElementById("remaining").innerText = `${message}`;
}

/************************* ERROR HANDLING *************************/
function showError(err) {
    let errors = document.getElementById("errors");
    errors.innerText += `\n${err}`;
    setTimeout(function(){ errors.innerText = "" }, 2000);
}