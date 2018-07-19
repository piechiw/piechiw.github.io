const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
let noteIsTrue = document.querySelector('#note-option').checked;

const todos = [];
const notes = [];

const updatePlaceholders = function () {
    if (noteIsTrue) {
        titleInput.setAttribute('placeholder', 'Enter note title');
        bodyInput.setAttribute('placeholder', 'Enter note body...');
    }
    else {
        titleInput.setAttribute('placeholder', 'Enter todo title');
        bodyInput.setAttribute('placeholder', 'Enter todo body...');
    }
}

const createNote = function (title, body) {
    notes.push({
        title: title,
        body: body,
    });
};


const createTodo = function (title, body) {
    todos.push({
        title: title,
        body: body,
        completed: false
    });
};

const renderNotes = function () {
    const notesDiv = document.querySelector('#note-div');
    notesDiv.innerHTML = '';

    notes.forEach(function (note) {
        const header = document.createElement('h2');
        header.textContent = note.title;
        const p = document.createElement('p');
        p.textContent = note.body;

        notesDiv.appendChild(header);
        notesDiv.appendChild(p);
    });
}

const renderTodos = function () {
    const todosDiv = document.querySelector('#todo-div');
    todosDiv.innerHTML = '';

    todos.forEach(function (todo) {

        const div = document.createElement('div');
        div.setAttribute('class', 'form-check');
        div.innerHTML = `<h2 class="text-center">${todo.title}</h2>
                        <label class="form-check-label checks">
                            <input class="form-check-input" value="" type="checkbox"> ${todo.body}
                            <span class="form-check-sign"></span>
                        </label>`;

        todosDiv.appendChild(div);

        addEventListenerToChecks();
    });
}

const addEventListenerToChecks = function () {
    const checksClass = document.querySelectorAll('.checks');
    checksClass[checksClass.length - 1].addEventListener('click', function (e) {
        
        let parEl = e.target.parentElement.parentElement;
        let i;
        for (i = 0; parEl !== null; i++) {
            parEl = parEl.previousSibling;
        }

        
        todos[i - 1].completed = e.target.checked;
    });
    
};

updatePlaceholders();

document.querySelector('#note-option').addEventListener('change', function (e) {
    noteIsTrue = true;
    updatePlaceholders();
});

document.querySelector('#todo-option').addEventListener('change', function (e) {
    noteIsTrue = false;
    updatePlaceholders();
});

document.querySelector('#create-btn').addEventListener('click', function (e) {
   const title = titleInput.value;
   const body = bodyInput.value;
   titleInput.value = '';
   bodyInput.value = '';

   if (noteIsTrue) {
       createNote(title, body);
       renderNotes();
   }
   else {
       createTodo(title, body);
       renderTodos();
   }

});

