import { Note } from "./Note";
import { NoteCategory } from "./NoteCategory";

const sqlite3 = require('sqlite3').verbose()

export class Database {

    private static instance: Database = new Database();

    private db: any;
    public static getInstance(): Database {
        if (!Database.instance.db) {
            Database.instance.db = new sqlite3.Database('TakeNote.db')
        }

        return Database.instance;
    }

    private constructor() {
        this.db = new sqlite3.Database('TakeNote.db')
        const createNoteQuery = `CREATE TABLE IF NOT EXISTS NoteCategory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
            )`;
        const createCategoryQuery = `CREATE TABLE IF NOT EXISTS Note (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT,
            noteCategoryId INTEGER,
            scratchpad boolean,
            favorite boolean,
            created TEXT,
            lastUpdated TEXT,
            FOREIGN KEY(noteCategoryId) REFERENCES NoteCategory(id)
            )`;
        this.db.run(createCategoryQuery);
        this.db.run(createNoteQuery);
    }

    storeNote(note: Note) {
        const stmt = this.db.prepare(`
            INSERT INTO Note 
            (content, noteCategoryId, scratchpad, favorite, created, lastUpdated) VALUES (    
            '${note.content}',
            ${note.noteCategoryId},
            ${note.scratchpad},
            ${note.favorite},
            datetime('now'),
            datetime('now')
        )`)
        stmt.run()
        stmt.finalize()
    }

    getNote(id: any, callback: any) {
        const sql = `SELECT * FROM Note
           WHERE id = ${id}`;

        this.db.get(sql, [], (err: any, row: any) => {
            if (err) {
                
                callback(null);
            }
            let note;
            if (row) {
                note = new Note(row.id, row.content, row.category, row.scratchpad,
                    row.favorite, row.created, row.lastUpdated);
            }
            
            callback(note)
        });
    }

    getAllNotes(callback: any): Promise<Array<Note>> {
        const sql = `SELECT * FROM Note`;
        const notes: Array<Note> = new Array();

        return this.db.all(sql, [], (err: any, rows: any[]) => {
            if (err) {
                callback(null);
            }
            rows.forEach((row) => {
                notes.push(new Note(row.id, row.content, row.category, row.scratchpad,
                    row.favorite, row.created, row.lastUpdated));
            });
            callback(notes);
        });
    }

    deleteNote(id: any) {
        const stmt = this.db.prepare(`DELETE FROM Note where id = ${id}`);
        stmt.run()
        stmt.finalize()
    }

    storeNoteCategory(noteCategory: NoteCategory) {
        const stmt = this.db.prepare(`
            INSERT INTO NoteCategory 
            (name) VALUES (    
            '${noteCategory.name}'
        )`)
        stmt.run()
        stmt.finalize()
    }

    getNoteCategory(id: any, callback: any): Promise<NoteCategory> {
        const sql = `SELECT * FROM NoteCategory
           WHERE id = ${id}`;

        return this.db.get(sql, [], (err: any, row: any) => {
            if (err) {
                callback(null)
            }

            let noteCategory;
            if (row) {
                noteCategory = new NoteCategory(row.id, row.name);
            }
            callback(noteCategory)
        });
    }

    getAllNoteCategories(callback: any): Promise<Array<NoteCategory>> {
        const sql = `SELECT * FROM NoteCategory`;
        const noteCategories: Array<NoteCategory> = new Array();

        return this.db.all(sql, [], (err: any, rows: any[]) => {
            if (err) {
                callback(null);
            }
            rows.forEach((row) => {
                noteCategories.push(new NoteCategory(row.id, row.name));
            });
            callback(noteCategories);
        });
    }

    deleteNoteCategory(id: any) {
        const stmt = this.db.prepare(`DELETE FROM NoteCategory where id = ${id}`);
        stmt.run()
        stmt.finalize()
    }

    close() {
        this.db.close()
    }
}