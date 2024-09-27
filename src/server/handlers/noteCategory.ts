import { Request, Response } from 'express'

import { Database } from "../utils/data/database"

export default {
    getNoteCategory: (request: Request, response: Response) => {
        const database = Database.getInstance();
        database.getNoteCategory(request.query.id, (NoteCategory: any) => {
          response.status(200).send(NoteCategory);
        })
    },
  
    getAllNoteCategories: (request: Request, response: Response) => {
        const database = Database.getInstance();
        database.getAllNoteCategories((noteCategories: any) => {
          response.status(200).send(noteCategories)
        })
    },

    storeNoteCategory: (request: Request, response: Response) => {

        const database = Database.getInstance();
        response.status(200).send(database.storeNoteCategory(request.body))
    },
  
    deleteNoteCategory: (request: Request, response: Response) => {

      const database = Database.getInstance();
      response.status(200).send(database.deleteNoteCategory(request.query.id))
    },
  }