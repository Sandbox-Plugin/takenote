import express from 'express'

import noteHandler from '../handlers/note'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()

router.post('/note', noteHandler.save)
router.get('/note', checkAuth, noteHandler.get)
router.delete('/note', noteHandler.delete)

export default router
