import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { v4 as uuidv4 } from "uuid";
import employeeData from "./staticData/employeeData.js";
import employeeRouter from "./routes/employees.js";
import departmentRouter from "./routes/departments.js";

const app = express();
const port = process.env.PORT;

app.post("/", ( req, res ) => {
    for (const employee of employeeData){
        employee.id = uuidv4();
    }
    res.status( 200 ).send( {message: "Number Id changed to random Id's.", data: employeeData });
});

app.use(express.json());

app.use( "/employee", employeeRouter );
app.use( "/department", departmentRouter );

app.listen( port, () => {
    console.log( `Server running on port ${port}.` )
});