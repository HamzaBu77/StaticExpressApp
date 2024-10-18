import departmentsData from "../../staticData/departmentData.js";
import employeesData from "../../staticData/employeeData.js";
import { v4 as uuidv4 } from "uuid";

export const createDepartment = async ( req, res ) => {
    try {
        // id: 1,
        // department: "Software Engineering",
        // location: "Cabin A",
        // createdDate: "2020-01-01"
        if( !req.body || Object.keys(req.body).length === 0 ){
            return res.status( 400 ).send({ Error: "Attributes needed to create Department." });
        };

        const { departmentName, location } = req.body;

        if( !departmentName || !location ) {
            return res.status( 400 ).send({ Error: "Missing parameters for creation of department." });
        };

        const findDepartmentByName = departmentsData.filter( department => department.departmentName === departmentName );

        if ( findDepartmentByName.length > 0 ){
            return res.status( 404 ).send({ Error: "Department Already Exists!" });
        };

        const createNewDepartment = {
            id: uuidv4(),
            departmentName,
            location,
            createdDate: new Date( Date.now() ).toISOString().split( 'T' )[0],
        }

        const checkDepartmentIdAlreadyExists = departmentsData.findIndex( department => department.id === createNewDepartment.id );

        if( checkDepartmentIdAlreadyExists !== -1 ){
            return res.status( 400 ).send({ Error: "Department with Id already Existed." });
        };

        return res.status( 200 ).send({
            message: "Department Created Successfully!",
            data: createNewDepartment,
        })

    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};

export const getAllDepartments = async ( req, res ) => {
    try {
        if( departmentsData.length === 0 ){
            return res.status( 404 ).send({ Error: "No Data Found against Departments."});
        } else {
            return res.status( 200 ).send({
                messgae: "Departments Found Successfully!",
                data: departmentsData
            })
        }
        
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};