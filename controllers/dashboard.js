import employeesData from "../staticData/employeeData.js";
import departmentsData from "../staticData/departmentData.js";


export const findEmployeesByDepartmentId = async ( req, res ) => {
    try {
        if( Object.keys( req.params ).length === 0 ){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        };

        const { id } = req.params;

        if( !id ){
            return res.status( 400 ).send({ Error: "Id is empty or null." });
        }

        const allActiveDepartments = departmentsData.filter( department => department.isActive === true );

        if( allActiveDepartments.length === 0 ){
            return res.status( 400 ).send({ Error: `No Department existed.` });
        }


        const departmentIsActiveOrNot = allActiveDepartments.filter( department => department.id === id );

        if( departmentIsActiveOrNot.length === 0 ){
            return res.status( 400 ).send({ Error: "Department Not Found." });
        }

        const employeesWithSameDepartment = employeesData.filter( department => department.departmentId === id );

        if( employeesWithSameDepartment.length === 0 ){
            return res.status( 400 ).send({ Error: "No Employee Associated with the given Department Id." });
        }

        return res.status( 200 ).send({
            message: "Employees found with corresponding Department ID.",
            data: employeesWithSameDepartment
        })
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};

export const findEmployeesByDepartmentName = async ( req, res ) => {
    try {
        console.log(req.params)
        if( Object.keys( req.params ).length === 0 ){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        };

        const { departmentName } = req.params;

        if( !departmentName ){
            return res.status( 400 ).send({ Error: "Department name is empty or null." });
        }

        const allActiveDepartments = departmentsData.filter( department => department.isActive === true );

        if( allActiveDepartments.length === 0 ){
            return res.status( 400 ).send({ Error: `No Department existed.` });
        }


        const departmentIsActiveOrNot = allActiveDepartments.filter( department => department.departmentName === departmentName );

        if( departmentIsActiveOrNot.length === 0 ){
            return res.status( 400 ).send({ Error: "Department Not Found." });
        }

        const employeesWithSameDepartmentName = employeesData.filter( employee => employee.departmentId === departmentIsActiveOrNot[0].id );

        if( employeesWithSameDepartmentName.length === 0 ){
            return res.status( 400 ).send({ Error: "No Employee Associated with the given Department Name." });
        }

        return res.status( 200 ).send({
            message: "Employees found with corresponding Department Name.",
            data: employeesWithSameDepartmentName
        })
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};

export const findEmployeeByName = async ( req, res ) => {
    try {
        console.log(req.params)
        if( Object.keys( req.params ).length === 0 ){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        };

        const { employeeName } = req.params;

        if( !employeeName ){
            return res.status( 400 ).send({ Error: "Employee name is empty or null." });
        }

        const activeEmployees = employeesData.filter( employee => employee.isActive === true );

        if( activeEmployees.length === 0 ){
            return res.status( 400 ).send({ Error: `No employee existed.` });
        };

        const searchedEmployee = activeEmployees.filter( employee => employee.firstName === employeeName );

        if( searchedEmployee.length === 0 ){
            return res.status( 400 ).send({ Error: `No employee existed with this name.` });
        }

        return res.status( 200 ).send({
            message: "Employee Found Successfully!",
            data: searchedEmployee
        })
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};

export const findEmployeeByEmail = async ( req, res ) => {
    try {
        console.log(req.params)
        if( Object.keys( req.params ).length === 0 ){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        };

        const { employeeEmail } = req.params;

        if( !employeeEmail ){
            return res.status( 400 ).send({ Error: "Employee email is empty or null." });
        }

        const activeEmployees = employeesData.filter( employee => employee.isActive === true );

        if( activeEmployees.length === 0 ){
            return res.status( 400 ).send({ Error: `No employee existed.` });
        };

        const searchedEmployee = activeEmployees.filter( employee => employee.email === employeeEmail );

        if( searchedEmployee.length === 0 ){
            return res.status( 400 ).send({ Error: `No employee Found with the corresponding email.` });
        }

        return res.status( 200 ).send({
            message: "Employee Found Successfully!",
            data: searchedEmployee
        })
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};

export const findEmployeeByPhoneNo = async ( req, res ) => {
    try {
        if( Object.keys( req.params ).length === 0 ){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        };

        const { employeePhoneNo } = req.params;

        if( !employeePhoneNo ){
            return res.status( 400 ).send({ Error: "Employee phone number is empty or null." });
        }

        const activeEmployees = employeesData.filter( employee => employee.isActive === true );

        if( activeEmployees.length === 0 ){
            return res.status( 400 ).send({ Error: `No employee existed.` });
        };

        const searchedEmployee = activeEmployees.filter( employee => employee.phone === employeePhoneNo );

        if( searchedEmployee.length === 0 ){
            return res.status( 400 ).send({ Error: `No employee Found with the corresponding phoneNo.` });
        }

        return res.status( 200 ).send({
            message: "Employee Found Successfully!",
            data: searchedEmployee
        })
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};

export const findEmployeeByPosition = async ( req, res ) => {
    try {
        if( Object.keys( req.params ).length === 0 ){
            return res.status( 400 ).send({ Error: "BAD REQUEST." });
        };

        const { employeePosition } = req.params;

        if( !employeePosition ){
            return res.status( 400 ).send({ Error: "Must provide employee position for search." });
        }

        const activeEmployees = employeesData.filter( employee => employee.isActive === true );

        if( activeEmployees.length === 0 ){
            return res.status( 400 ).send({ Error: `No employee existed.` });
        };

        const searchedEmployee = activeEmployees.filter( employee => employee.position === employeePosition );

        if( searchedEmployee.length === 0 ){
            return res.status( 400 ).send({ Error: `No employee Found with the corresponding position.` });
        }

        return res.status( 200 ).send({
            message: "Employee Found Successfully!",
            data: searchedEmployee
        })
    } catch (error) {
        res.status( 500 ).send({ message: "Internal Server Error.", Error: error.message });
    }
};