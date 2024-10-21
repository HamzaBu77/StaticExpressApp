import { Router } from "express";
import { createDepartment, deleteDepartmentById, getAllDepartments, getDepartmentById, getDepartmentByName, updateDepartmentById } from "../controllers/departments.js";

const departmentRouter = Router();

departmentRouter.post( "/create", createDepartment );
departmentRouter.get( "/alldepartments", getAllDepartments );
departmentRouter.get( "/:id", getDepartmentById );
departmentRouter.get( "/departmentname/:departmentName", getDepartmentByName );
departmentRouter.patch( "/update/:id", updateDepartmentById );
departmentRouter.delete( "/delete/:id", deleteDepartmentById );

export default departmentRouter;