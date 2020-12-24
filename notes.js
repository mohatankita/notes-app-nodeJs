const fs = require('fs');
const chalk = require('chalk');

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.find(note => note.title === title);

    if(!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added successfully !'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const removeNote = notes.findIndex((note) => note.title === title);
    if(removeNote >= 0) {
        notes.splice(removeNote, 1);
        saveNotes(notes);
        console.log(chalk.green.inverse('Successfully removed note!'));
    } else {
        console.log(chalk.red.inverse('Note not available!'));
    }
}

const getNotes = () => { 
    const notes = loadNotes();
    console.log(chalk.yellow.inverse('Notes List'))
    notes.forEach(note => {
        console.log(note.title + " - " + note.body)
    })
}

const readNotes = (title) => {
    const notes = loadNotes();
    console.log(chalk.yellow.inverse('Read Note!'));
    const index = notes.findIndex((note) => note.title === title);
    if(index >= 0) {
        console.log(chalk.grey.inverse(notes[index].title));
        console.log(notes[index].body)
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNotes: readNotes
};