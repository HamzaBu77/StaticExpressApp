import { Router } from "express";
import { createDepartment, getAllDepartments, getDepartmentById } from "../controllers/departments/departments.js";

const departmentRouter = Router();

departmentRouter.post( "/create", createDepartment );
departmentRouter.get( "/alldepartments", getAllDepartments );
departmentRouter.get( "/:id", getDepartmentById );

export default departmentRouter;