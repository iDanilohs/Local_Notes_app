const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

// 1. initialize the arry form localstorge or empty
let notesStorage = JSON.parse(localStorage.getItem('notes')) || [];
console.log('noteStorage: ' + notesStorage);

// Function to display the notes
function displayNotes() {
    notesList.innerHTML = ''; //clean the page
    notesStorage.forEach((noteText, index) => {
        const li = document.createElement('li');
        li.textContent = noteText;

        // create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');

        // Delete logic
        deleteBtn.addEventListener('click', ()=> {
            deleteNote(index);
        })
        
        li.appendChild(deleteBtn); // delete button
        notesList.appendChild(li); // text
    })
}

// Fuction to delete notes
function deleteNote(index) {
    notesStorage.splice(index, 1); // take 1 item form the index
    localStorage.setItem('notes', JSON.stringify(notesStorage));
    displayNotes();
}

// Function to add notes
function saveNotes () {
    //convert the array to a JSON string before saving
    localStorage.setItem('notes', JSON.stringify(notesStorage));
    displayNotes();
}

// Handle form submission
noteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newNote = noteInput.value.trim();

    if (newNote) {
        notesStorage.push(newNote); // add the note to the array
        saveNotes(); // save updated array
        noteInput.value = '';
    }
});

// Diplay notes when the page loads
document.addEventListener('DOMContentLoaded', displayNotes)