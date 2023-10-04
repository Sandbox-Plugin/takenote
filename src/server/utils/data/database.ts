import { Note } from "./Note";

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
        this.db.run(`CREATE TABLE IF NOT EXISTS Note (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userToken TEXT, 
            content TEXT,
            category TEXT,
            scratchpad boolean,
            favorite boolean,
            created TEXT,
            lastUpdated TEXT
            )`);
        this.close();
    }

    store(note: Note, userToken: string) {
        const stmt = this.db.prepare(`
            INSERT INTO Note 
            (userToken, content, category, scratchpad, favorite, created, lastUpdated) VALUES (    
            ${userToken},
            ${note.content},
            ${note.category},
            ${note.scratchpad},
            ${note.favorite},
            datetime('now'),
            datetime('now')
        )`)
        stmt.run()
        stmt.finalize()
        this.close();
    }

    get(id: number, userToken: string): Promise<Note> {
        const sql = `SELECT * FROM Note
           WHERE id = ${id} AND userToken=${userToken}`;

        return this.db.get(sql, [], (err: any, row: any) => {
            if (err) {
                this.close();
                
                return err;
            }

            const note = new Note(row.id, row.userToken, row.content, row.category, row.scratchpad,
                row.favorite, row.created, row.lastUpdated);
            this.close();
            
            return note;
        });
    }

    getAll(userToken: string): Promise<Array<Note>> {
        const sql = `SELECT * FROM Note
           WHERE userToken=?`;
        const notes: Array<Note> = new Array();

        return this.db.all(sql, [userToken], (err: any, rows: any[]) => {
            if (err) {
                this.close();

                return err;
            }
            rows.forEach((row) => {
                notes.push(new Note(row.id, row.userToken, row.content, row.category, row.scratchpad,
                    row.favorite, row.created, row.lastUpdated));
            });

            this.close();

            return notes;
        });
    }


    delete(id: number, userToken: string) {
        const stmt = this.db.prepare(`DELETE FROM Note where id = ${id} AND userToken = ${userToken}`);
        stmt.run()
        stmt.finalize()
        this.close();
    }

    close() {
        this.db.close()
    }
}