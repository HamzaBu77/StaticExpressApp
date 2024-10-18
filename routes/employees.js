import { Router } from "express";
import { createEmployee, deleteEmployeeById, findAllEmployees, findEmployeeById, updateEmployeeById } from "../controllers/employees/employees.js";


const employeeRouter = Router();

employeeRouter.get( "/all", findAllEmployees );
employeeRouter.get( "/:id", findEmployeeById );
employeeRouter.post( "/create", createEmployee );
employeeRouter.patch( "/update/:id", updateEmployeeById );
employeeRouter.delete( "/delete/:id", deleteEmployeeById );

export default employeeRouter;