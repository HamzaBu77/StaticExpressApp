import { Router } from "express";
import * as Controller from "../controllers/employees.controllers.js";

const employeeRouter = Router();

employeeRouter.get( "/", findAllEmployees );
employeeRouter.post( "/", Controller.create );
employeeRouter.get( "/:id", findEmployeeById );
employeeRouter.patch( "/:id", updateEmployeeById );
employeeRouter.delete( "/:id", deleteEmployeeById );

export default employeeRouter;


// import { Router } from "express";
// import * as Controller from "../controllers/employees.js";
// const router = Router();
// router.get( "/", Controller.list );
// router.get( "/:id", Controller.show );
// router.post( "/", Controller.post / create );
// router.patch( "/:id", Controller.patch  );
// router.delete( "/:id", Controller.delete );

// export default router;