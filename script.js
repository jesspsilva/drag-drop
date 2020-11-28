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
            <div class="delete">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
        <div class="add-task">
            <input type="button" value="Add task" onclick="addTask(event)">
        </div>
    </div>`
    boardContainer.innerHTML += board;
}

const deleteBtn = document.querySelectorAll('.delete input');
deleteBtn.forEach(btn => {
    btn.addEventListener('click',e => {
        e.preventDefault();
        const element = e.target;
        const listToDelete = element.parentElement.parentElement.parentElement;
        listToDelete.remove();
    })
});

// Add task btn - to implement
const addTaskBtn = document.querySelectorAll('.add-task input');
addTaskBtn.forEach(btn => {
    btn.addEventListener('click',e => {
        e.preventDefault();
        alert('Under development')
    })
});

function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dropIt(ev) {
    ev.preventDefault();
    let sourceId = ev.dataTransfer.getData("text/plain");
    let sourceIdEl = document.getElementById(sourceId);
    let sourceIdParentEl = sourceIdEl.parentElement;
    // ev.target.id here is the id of target Object of the drop
    let targetEl = document.getElementById(ev.target.parentElement.id)
    let targetParentEl = targetEl.parentElement;
    let targetChildEl = targetEl.childNodes;

    if (targetEl.className === sourceIdParentEl.className) {
        targetChildEl.forEach(el =>  {
            if(el.className === 'card'){
                targetEl.appendChild(sourceIdEl);
                console.log(targetEl);
            } else {
                // Append to the list
                targetEl.appendChild(sourceIdEl);
                console.log(targetEl);
            }
        })
    }
}