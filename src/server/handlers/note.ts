import { Request, Response } from 'express'

import { Database } from "../utils/data/database"
import { Note } from '../utils/data/Note';


export default {
    get: (request: Request, response: Response) => {
        const database = Database.getInstance();
        database.getNote(request.query.id, (note: any) => {
          response.status(200).send(note);            
        });
    },
  
    getAll: (request: Request, response: Response) => {
        const database = Database.getInstance();
        database.getAllNotes((notes: any) => {
          response.status(200).send(notes);
        })
    },

    store: async (request: Request, response: Response) => {

        const database = Database.getInstance();
        response.status(200).send(database.storeNote(request.body))
    },
  
    delete: async (request: Request, response: Response) => {

      const database = Database.getInstance();
      response.status(200).send(database.deleteNote(request.query.id))
    },
  }