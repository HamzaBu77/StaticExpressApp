import { Router } from 'express'
import * as Controller from '../controllers/departments.controllers.js'
const router = Router()

router.get('/', Controller.list)
router.get('/:id', Controller.show)
router.post('/', Controller.create)
router.patch('/:id', Controller.patch)
router.delete('/:id', Controller.remove)

export default router
