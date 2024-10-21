import { Router } from "express";
import { findEmployeeByEmail, findEmployeeByName, findEmployeeByPhoneNo, findEmployeeByPosition, findEmployeesByDepartmentId, findEmployeesByDepartmentName } from "../controllers/dashboard.js";

const dashboardRouter = Router();

dashboardRouter.get( "/employeesbydepartmentid/:id", findEmployeesByDepartmentId );
dashboardRouter.get( "/employeesbydepartmentname/:departmentName", findEmployeesByDepartmentName );
dashboardRouter.get( "/employeebyname/:employeeName", findEmployeeByName );
dashboardRouter.get( "/employeebyemail/:employeeEmail", findEmployeeByEmail );
dashboardRouter.get( "/employeebyphoneno/:employeePhoneNo", findEmployeeByPhoneNo );
dashboardRouter.get( "/employeebyposition/:employeePosition", findEmployeeByPosition );

export default dashboardRouter;