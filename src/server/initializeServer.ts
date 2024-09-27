import path from 'path'

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import { getNote, getAllNotes, saveNote, deleteNote } from './router/note'
import { deleteNoteCategory, getAllNoteCategories, getNoteCategory, saveNoteCategory } from './router/noteCategory'

export default function initializeServer() {
  const app = express()
  const isProduction = process.env.NODE_ENV === 'production'
  const origin = { origin: isProduction ? false : '*' }

  app.set('trust proxy', 1)
  app.use(express.json())
  app.use(cookieParser())
  app.use(cors(origin))
  app.use(helmet())
  app.use(compression())

  app.use((request, response, next) => {
    return next()
  })

  app.use(express.static(path.join(__dirname, '../../dist/')))
  registerRouters(app);
  
  return app
}

function registerRouters(app: any) {
  app.route('/api/note').get(getNote)
  app.route('/api/note').post(saveNote)
  app.route('/api/note/all').get(getAllNotes)
  app.route('/api/note').delete(deleteNote)
  app.route('/api/noteCategory').get(getNoteCategory)
  app.route('/api/noteCategory').post(saveNoteCategory)
  app.route('/api/noteCategory/all').get(getAllNoteCategories)
  app.route('/api/noteCategory').delete(deleteNoteCategory)
}



