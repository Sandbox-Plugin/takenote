import { Request, Response } from 'express'

import { Database } from "../utils/data/database"


export default {
    get: async (request: Request, response: Response) => {
        const database = Database.getInstance();
        const accessToken = request.cookies?.githubAccessToken
        const { accessToken2 } = response.locals
        console.log('res ', accessToken, accessToken2, database.get(request.body.id, accessToken));
        response.status(200).send(database.get(request.body.id, accessToken))
    },
  
    save: async (request: Request, response: Response) => {

        const database = Database.getInstance();
        // const { accessToken } = response.locals
        const accessToken = request.cookies?.githubAccessToken
        response.status(200).send(database.store(request.body.note, accessToken))
    },
  
    delete: async (request: Request, response: Response) => {
  
      response.status(200).send({ message: 'Logged out' })
    },
  }