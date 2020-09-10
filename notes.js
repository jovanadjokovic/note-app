const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) =>note.title===title)


    if (!duplicateNote) {
        notes.push({ 
            title: title, 
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added'))
    }
    else {
        console.log(chalk.red('Note title taken'))
    }
    
} 

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToSave = notes.filter( (note) =>  note.title!==title)
    if (notesToSave.length!==notes.length) {
        saveNotes(notesToSave)
        console.log(chalk.green('Note removed'))
    }
    else {
        console.log(chalk.red('There is no such a note.'))
    }
    
}

const listNotes = () => {
    console.log(chalk.magenta.italic('Your notes:'))
    const notes=loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNotes = (title) => {
    
    const notes=loadNotes()
    const note=notes.find((note) => note.title===title)
    if (note) {
        console.log(chalk.magenta(title))
        console.log(note.body)
    } else {
        console.log('There is no note with that title.')
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return (JSON.parse(dataJSON)) 
    } catch (e) {
        return []
    }
    

}

module.exports = {
    addNote: addNote, 
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}