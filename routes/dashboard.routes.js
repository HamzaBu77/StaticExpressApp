import { Router } from 'express'
import * as Controller from '../controllers/dashboard.controllers.js'

const router = Router()

router.get('/employeesbydepartmentid/:id', Controller.listEmployeesByDepartmentId)
router.get(
    '/employeesbydepartmentname/:departmentName',
    Controller.listEmployeesByDepartmentName
)
router.get('/listbyemployeename/:employeeName', Controller.listEmployeesByName)
router.get(
    '/listbyemployeeemail/:employeeEmail',
    Controller.listEmployeesByEmail
)
router.get(
    '/listbyemployeephoneno/:employeePhoneNo',
    Controller.listEmployeesByPhoneNo
)
router.get(
    '/listbyemployeeposition/:employeePosition',
    Controller.listEmployeesByPosition
)
router.get(
    '/listbyemployeehiredate/:employeeHireDate',
    Controller.listEmployeesByHireDate
)

export default router
