import employeesData from "../../staticData/employeeData.js";
import departmentData from "../../staticData/departmentData.js";
import { v4 as uuidv4 } from "uuid";

export const createEmployee = async ( req, res ) => {
    try {
        const { firstName, lastName, email, phone, position, salary, hireDate, departmentId, isActive } = req.body;

        if ( !firstName, !lastName, !email, !phone, !position, !salary, !departmentId ){
            return res.status( 400 ).send({ Error: "Required Parameter is Missing or Empty." });
        };

        const departmentsId = departmentData.map( department => department.id );

        if( !departmentsId.includes( departmentId )){
            return res.status( 400 ).send({ Error: " Department does not exist! " });
        };

        const employeesEmail = employeesData.map( employee => employee.email );

        if( employeesEmail.includes( email )){
            return res.status( 400 ).send( " Email already Exist! ");
        };

        const employeesPhoneNo = employeesData.map( employee => employee.phone );

        if( employeesPhoneNo.includes( phone )){
            return res.status( 400 ).send({ Error: " Phone number already Exist! " });
        };

        const createEmployee = {
            id: uuidv4(),
            firstName,
            lastName,
            email,
            phone,
            position,
            salary,
            hireDate: new Date( Date.now() ).toISOString().split( 'T' )[0],
            departmentId: 1,
            isActive: true
        }

        const employeesId = employeesData.map( employee => employee.id );

        if( employeesId.includes( createEmployee.id )){
            return res.status( 400 ).send({ Error: " Id already Exist! " });
        };

        employeesData.push( createEmployee );
        
        return res.status( 200 ).send({
            message: "Employee created successfully!",
            data: createEmployee
        })

    } catch (error) {
        res.status( 500 ).send({ message:`Internal Server Error`, Error: error.message });
    }
}

export const findAllEmployees = async ( req, res ) => {
    try {
        if ( !employeesData ){
            return res.status( 204 ).send( "Employee Data is Empty, No data available to show." )
        } else {
            const activeEmployees = employeesData.filter( employee => employee.isActive === true );
            return res.status( 200 ).send({
                message: "Fetched Data Successfully!",
                data: activeEmployees,
            });
        }
    } catch (error) {
        res.status( 500 ).send({ message:`Internal Server Error`, Error: error.message });
    }
}

export const findEmployeeById = async ( req, res ) => {
    try {
        const { id } = req.params;

        if( !id ){
            return res.status( 400 ).send({ message: "Id must be passed to fetch data of employee." });
        };

        const activeEmployees = employeesData.filter( employee => employee.isActive === true );

        if( activeEmployees.length === 0 ){
            return res.status( 400 ).send({ Error: "Employee Data is Empty."});
        }

        const employee = activeEmployees.filter( employee => employee.id === id );

        if( !employee || employee.length === 0 ) {
            return res.status( 404 ).send({ message: `No employee exists with the id: ${id}` });
        };

        return res.status( 200 ).send( { message: "Employee Found Successfully!", data: employee } );
    } catch ( error ) {
        res.status( 500 ).send({ message:`Internal Server Error`, Error: error.message });
    }
}

export const updateEmployeeById = async ( req, res ) => {
    try {
        if ( Object.keys(req.body).length === 0 || Object.keys(req.body).length >= 10){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        }

        const { id } = req.params;
        const findIndexOfEmployee = employeesData.findIndex( employee => employee.id === id );

        if( findIndexOfEmployee < 0 ){
            return res.status(400).send({ Error: "No Employee Found with the corresponding ID." });
        } else if( req.body.id ){
            return res.status(401).send({ Error: "No rights to update Id." })
        } else if( req.body.departmentId ){
            return res.status(401).send({ Error: "No rights to change department ID." })
        } else if(req.body.hireDate) {
            return res.status(401).send({ Error: "No rights to change hire date." })
        } else if( req.body.isActive ) {
            return res.status(401).send({ Error: "No rights to update isActive field." })
        }

        req.body.firstName ? employeesData[findIndexOfEmployee].firstName = req.body.firstName : null ;
        req.body.lastName ? employeesData[findIndexOfEmployee].lastName = req.body.lastName : null ;
        req.body.email ? employeesData[findIndexOfEmployee].email = req.body.email : null ; 
        req.body.phone ? employeesData[findIndexOfEmployee].phone = req.body.phone : null ;  
        req.body.position ? employeesData[findIndexOfEmployee].position = req.body.position : null ; 
        req.body.salary ? employeesData[findIndexOfEmployee].salary = req.body.salary : null ;

        res.status(200).send({
            message: "Employee Updated Successfully!",
            data: employeesData[findIndexOfEmployee]
        });
    } catch (error) {
        res.status( 500 ).send({ message:`Internal Server Error`, Error: error });
    }
}

export const deleteEmployeeById = async ( req, res) => {
    try {
        const { id } = req.params;

        if ( !id ){
            return res.status( 400 ).send({ Error: "Id must be provided to delete Employee." });
        };

        const findIndexOfEmployee = employeesData.findIndex( employee => employee.id === id );

        if( findIndexOfEmployee < 0 ){
            return res.status( 400 ).send({ message: "No Employee associated to the provided ID." });
        };

        if( employeesData[findIndexOfEmployee].isActive === false ){
            return res.status( 400 ).send({ Error: `No Employee Found with the id: ${employeesData[findIndexOfEmployee].id}`});
        };

        employeesData[findIndexOfEmployee].isActive = false;

        return res.status( 200 ).send({ message: `Employe with id ${employeesData[findIndexOfEmployee].id} deleted successfully.`})


    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error", Error: error.message });
    }

}