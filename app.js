import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { v4 as uuidv4 } from "uuid";
import employeeData from "./staticData/employeeData.js";
import departmentsData from "./staticData/departmentData.js";
import employeeRouter from "./routes/employees.routes.js";
import departmentRouter from "./routes/departments.js";
import dashboardRouter from "./routes/dashboard.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use( "/employee", employeeRouter );
app.use( "/department", departmentRouter );
app.use( "/dashboard", dashboardRouter );

app.listen( port, () => {
    console.log( `Server running on port ${port}.` )
});