import departmentsData from "../../staticData/departmentData.js";
import employeesData from "../../staticData/employeeData.js";
import { v4 as uuidv4 } from "uuid";

export const createDepartment = async ( req, res ) => {
    try {
        if( !req.body || Object.keys(req.body).length === 0 ){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        };

        const { departmentName, location } = req.body;

        if( !departmentName || !location ) {
            return res.status( 400 ).send({ Error: "Parameters missing for creation of department." });
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
            isActive: true
        }

        const checkDepartmentIdAlreadyExists = departmentsData.findIndex( department => department.id === createNewDepartment.id );

        if( checkDepartmentIdAlreadyExists !== -1 ){
            return res.status( 400 ).send({ Error: "Department with Id already Existed." });
        };

        departmentsData.push( createNewDepartment );

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
            const allActiveDepartments = departmentsData.filter( department => department.isActive === true );
            return res.status( 200 ).send({
                messgae: "Departments Found Successfully!",
                data: allActiveDepartments
            })
        }
        
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};

export const getDepartmentById = async ( req, res ) => {
    try {
        if( !req.params || Object.keys(req.params).length === 0 ){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        };

        const { id } = req.params;

        if( !id ){
            return res.status( 400 ).send({ Error: "Id is empty or null." });
        }

        const allActiveDepartments = departmentsData.filter( department => department.isActive === true );

        const departmentSearch = allActiveDepartments.find( department => department.id === id );

        if( !departmentSearch ){
            return res.status( 404 ).send({ Error: `Department not Found with id ${id}` });
        }

        res.status( 200 ).send({
            mesasge: "Department Found Successfully!",
            data: departmentSearch
        });
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};

export const updateDepartmentById = async ( req, res ) => {
    try {
        if( !req.params || Object.keys(req.params).length === 0 ){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        };

        const { id } = req.params;

        if( !id ){
            return res.status( 400 ).send({ Error: "Id is empty or null." });
        }

        const indexOfSearchedDepartment = departmentsData.findIndex( department => department.id === id );

        if( indexOfSearchedDepartment < 0  ){
            return res.status(400).send({ Error: "No Department Found with the corresponding ID." });
        } else if( req.body.id ){
            return res.status(401).send({ Error: "No rights to update Id." })
        } else if( req.body.isActive ) {
            return res.status(401).send({ Error: "No rights to update isActive field." })
        }

        req.body.departmentName ? departmentsData[indexOfSearchedDepartment].departmentName = req.body.departmentName : null ;
        req.body.location ? departmentsData[indexOfSearchedDepartment].location = req.body.location : null ;

        res.status(200).send({
            message: "Employee Updated Successfully!",
            data: departmentsData[indexOfSearchedDepartment]
        });
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};

