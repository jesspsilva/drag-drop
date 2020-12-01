let numberOfLists = 3;

function addBoard(e){
    e.preventDefault();
    numberOfLists++;
    let boardContainer = document.getElementById('boardlists');
    let board = `            
    <div id='list${numberOfLists}' class="board-list" ondrop="dropIt(event)" ondragover="allowDrop(event)">
        <div class="top">
            <div class="list-title" contenteditable="true">
                New Board
            </div>
            <div class="delete" onclick="deleteBoard(event)">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
        <div class="add-task">
            <input type="button" value="Add task" onclick="addTask(event)">
        </div>
    </div>`
    boardContainer.innerHTML += board;
}


function deleteBoard(e) {
    e.preventDefault();
    const element = e.target;
    const listToDelete = element.parentElement.parentElement.parentElement;
    listToDelete.remove();
}

function addTask(e) {
    e.preventDefault();

    const allTasks = document.querySelectorAll('.card');
    const addTaskButton = e.target.parentElement;

    const position = allTasks.length - 1;
    const lastID = Number(allTasks[position].id.replace(/[^0-9]/g,'')) + 1;

    const task = `                
    <div id='card${lastID}' class="card" draggable="true" ondragstart="dragStart(event)">
        <div class="content">New task</div>
        <div class="edit" onclick="editTask(event)">
            <i class="fas fa-pen"></i>
        </div>
    </div>`
    addTaskButton.insertAdjacentHTML("beforebegin", task);
}

function editTask(e) {
    e.preventDefault();
    const element = e.target;
    const taskEl = element.parentElement.parentElement.firstElementChild;
    const taskTxt = taskEl.innerText;
    taskEl.contentEditable = "true";
    taskEl.focus();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dropIt(ev) {
    ev.preventDefault();
    const sourceId = ev.dataTransfer.getData("text/plain");
    const sourceIdEl = document.getElementById(sourceId);
    const sourceIdParentEl = sourceIdEl.parentElement;
    const targetEl = document.getElementById(ev.target.parentElement.id);
    const targetElChilds = targetEl.childNodes;

    if (targetEl.className === sourceIdParentEl.className) {
        targetElChilds.forEach(child =>  {
            if(child.className === 'add-task'){
                child.before(sourceIdEl);
            }
        })
    }
}