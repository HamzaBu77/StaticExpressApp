import { Router } from "express";
import { createDepartment } from "../controllers/departments/departments.js";

const departmentRouter = Router();

departmentRouter.post( "/create", createDepartment);

export default departmentRouter;