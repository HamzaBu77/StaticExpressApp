import { Router } from 'express'
import * as Controller from '../controllers/dashboard.controllers.js'

const router = Router()

router.get('/', Controller.list)

export default router
