import { db } from './SQLite'

export function createTable() {
    db.transaction(createTableNotesStatement, console.error)
}

export async function addNote(note) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("INSERT INTO Notes (title, label, content) VALUES (?, ?, ?);", 
                [note.title, note.label, note.content],
                resolve('Note added'),
                console.error)
        })
    })
}

export async function updateNote(note) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql('UPDATE Notes SET title = ?, label = ?, content = ? WHERE id = ?;', 
                [note.title, note.label, note.content, note.id],
                resolve('Note updated'),
                console.error)
        })
    })
}

export async function deleteNote(note) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql('DELETE FROM Notes WHERE id = ?;', 
                [note.id],
                resolve('Note deleted'),
                console.error)
        })
    })
}

export async function getAllNotes() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql('SELECT * FROM Notes;',
            [],
            (_, result) => resolve(result.rows._array),
            console.error)
        })
    })
}

export async function getAllNotesWithLabel(label) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql('SELECT * FROM Notes n WHERE n.label = ?;',
            [label],
            (_, result) => resolve(result.rows._array),
            console.error)
        })
    })
}

function createTableNotesStatement(transaction) {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, label TEXT, content TEXT);")
}