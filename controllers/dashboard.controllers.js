import * as EmployeesRecord from '../staticRecord/employeesRecord.js'
import * as DepartmentRecord from '../staticRecord/departmentsRecord.js'

export const listEmployeesByDepartmentId = async (req, res) => {
    try {
        if (Object.keys(req.query).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const where = req.query

        if (Object.keys(where).length === 0) {
            return res.status(400).send({ Error: 'Query cannot be empty.' })
        }

        const allActiveEmployees = EmployeesRecord.employees.filter(
            (employee) => employee.isActive === true
        )

        if (allActiveEmployees.length === 0) {
            return res.status(400).send({ Error: `No Employee existed.` })
        }

        if (where?.departmentName) {
            const allActiveDepartments = DepartmentRecord.departments.filter(
                (department) => department.isActive === true
            )

            if (allActiveDepartments.length === 0) {
                return res.status(400).send({ Error: `No Department existed.` })
            }

            const departmentByName = allActiveDepartments.filter((department) =>
                department.departmentName
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )

            const departmentIdsFindByName = departmentByName.map(
                (department) => department.id
            )
            const allActiveEmployees = EmployeesRecord.employees.filter(
                (employee) => employee.isActive === true
            )

            if (allActiveEmployees.length === 0) {
                return res.status(400).send({ Error: `No Employee existed.` })
            }

            const employeeByDepartmentName = allActiveEmployees.filter(
                (employee) =>
                    departmentIdsFindByName.includes(employee.departmentId)
            )

            return res.status(200).send({
                message: 'Employees found with corresponding department name.',
                data: employeeByDepartmentName,
            })
        } else if (where?.departmentName) {
            const employeeByDepartmentId = allActiveEmployees.filter(
                (employee) =>
                    employee.departmentId
                        .toLowerCase()
                        .includes(where?.search.toLowerCase())
            )

            return res.status(200).send({
                message: 'Employees found with corresponding department id.',
                data: employeeByDepartmentId,
            })
        } else if (where?.firstName) {
            const employeeByFirstName = allActiveEmployees.filter((employee) =>
                employee.firstName
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )
            return res.status(200).send({
                message: 'Employees found with corresponding name.',
                data: employeeByFirstName,
            })
        } else if (where?.email) {
            const employeeByEmail = allActiveEmployees.filter((employee) =>
                employee.email
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )
            return res.status(200).send({
                message: 'Employees found with corresponding email.',
                data: employeeByEmail,
            })
        } else if (where?.phoneNo) {
            const employeeByPhoneNo = allActiveEmployees.filter((employee) =>
                employee.phone
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )
            return res.status(200).send({
                message: 'Employees found with corresponding phone number.',
                data: employeeByPhoneNo,
            })
        } else if (where?.position) {
            const employeeByPosition = allActiveEmployees.filter((employee) =>
                employee.position
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )
            return res.status(200).send({
                message: 'Employees found with corresponding position.',
                data: employeeByPosition,
            })
        } else if (where?.hiredate) {
            const employeeByHireDate = allActiveEmployees.filter((employee) =>
                employee.hireDate
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )
            return res.status(200).send({
                message: 'Employees found with corresponding hire date.',
                data: employeeByHireDate,
            })
        }

        if (departmentIsActiveOrNot.length === 0) {
            return res.status(400).send({ Error: 'Department Not Found.' })
        }

        const employeesWithSameDepartment = EmployeesRecord.employees.filter(
            (employee) =>
                employee.departmentId.toLowerCase().includes(id.toLowerCase())
        )

        if (employeesWithSameDepartment.length === 0) {
            return res.status(400).send({
                Error: 'No Employee Associated with the given Department Id.',
            })
        }

        return res.status(200).send({
            message: 'Employees found with corresponding Department ID.',
            data: employeesWithSameDepartment,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const listEmployeesByDepartmentName = async (req, res) => {
    try {
        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { departmentName } = req.params

        if (!departmentName) {
            return res
                .status(400)
                .send({ Error: 'Department name is empty or null.' })
        }

        const allActiveDepartments = DepartmentRecord.departments.filter(
            (department) => department.isActive === true
        )

        if (allActiveDepartments.length === 0) {
            return res.status(400).send({ Error: `No Department existed.` })
        }

        const departmentIsActiveOrNot = allActiveDepartments.filter(
            (department) =>
                department.departmentName
                    .toLowerCase()
                    .includes(departmentName.toLowerCase())
        )

        if (departmentIsActiveOrNot.length === 0) {
            return res.status(400).send({ Error: 'Department Not Found.' })
        }

        const departmentIds = departmentIsActiveOrNot.map(
            (department) => department.id
        )

        const employeesWithSameDepartmentName =
            EmployeesRecord.employees.filter((employee) =>
                departmentIds.includes(employee.departmentId)
            )

        if (employeesWithSameDepartmentName.length === 0) {
            return res.status(400).send({
                Error: 'No Employee Associated with the given Department Name.',
            })
        }

        return res.status(200).send({
            message: 'Employees found with corresponding Department Name.',
            data: employeesWithSameDepartmentName,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const listEmployeesByName = async (req, res) => {
    try {
        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { employeeName } = req.params

        if (!employeeName) {
            return res
                .status(400)
                .send({ Error: 'Employee name is empty or null.' })
        }

        const activeEmployees = EmployeesRecord.employees.filter(
            (employee) => employee.isActive === true
        )

        if (activeEmployees.length === 0) {
            return res.status(400).send({ Error: `No employee existed.` })
        }

        const searchedEmployee = activeEmployees.filter((employee) =>
            employee.firstName
                .toLowerCase()
                .includes(employeeName.toLowerCase())
        )

        if (searchedEmployee.length === 0) {
            return res
                .status(400)
                .send({ Error: `No employee existed with this name.` })
        }

        return res.status(200).send({
            message: 'Employee Found Successfully!',
            data: searchedEmployee,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const listEmployeesByEmail = async (req, res) => {
    try {
        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { employeeEmail } = req.params

        if (!employeeEmail) {
            return res
                .status(400)
                .send({ Error: 'Employee email is empty or null.' })
        }

        const activeEmployees = EmployeesRecord.employees.filter(
            (employee) => employee.isActive === true
        )

        if (activeEmployees.length === 0) {
            return res.status(400).send({ Error: `No employee existed.` })
        }

        const searchedEmployee = activeEmployees.filter((employee) =>
            employee.email.toLowerCase().includes(employeeEmail.toLowerCase())
        )

        if (searchedEmployee.length === 0) {
            return res.status(400).send({
                Error: `No employee Found with the corresponding email.`,
            })
        }

        return res.status(200).send({
            message: 'Employee Found Successfully!',
            data: searchedEmployee,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const listEmployeesByPhoneNo = async (req, res) => {
    try {
        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { employeePhoneNo } = req.params

        if (!employeePhoneNo) {
            return res
                .status(400)
                .send({ Error: 'Employee phone number is empty or null.' })
        }

        const activeEmployees = EmployeesRecord.employees.filter(
            (employee) => employee.isActive === true
        )

        if (activeEmployees.length === 0) {
            return res.status(400).send({ Error: `No employee existed.` })
        }

        const searchedEmployee = activeEmployees.filter((employee) =>
            employee.phone.toLowerCase().includes(employeePhoneNo.toLowerCase())
        )

        if (searchedEmployee.length === 0) {
            return res.status(400).send({
                Error: `No employee Found with the corresponding phoneNo.`,
            })
        }

        return res.status(200).send({
            message: 'Employee Found Successfully!',
            data: searchedEmployee,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const listEmployeesByPosition = async (req, res) => {
    try {
        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { employeePosition } = req.params

        if (!employeePosition) {
            return res
                .status(400)
                .send({ Error: 'Must provide employee position for search.' })
        }

        const activeEmployees = EmployeesRecord.employees.filter(
            (employee) => employee.isActive === true
        )

        if (activeEmployees.length === 0) {
            return res.status(400).send({ Error: `No employee existed.` })
        }

        const searchedEmployee = activeEmployees.filter((employee) =>
            employee.position
                .toLowerCase()
                .includes(employeePosition.toLowerCase())
        )

        if (searchedEmployee.length === 0) {
            return res.status(400).send({
                Error: `No employee Found with the corresponding position.`,
            })
        }

        return res.status(200).send({
            message: 'Employee Found Successfully!',
            data: searchedEmployee,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const listEmployeesByHireDate = async (req, res) => {
    try {
        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { employeeHireDate } = req.params

        if (!employeeHireDate) {
            return res
                .status(400)
                .send({ Error: 'Must provide employee Hire Date for search.' })
        }

        const activeEmployees = EmployeesRecord.employees.filter(
            (employee) => employee.isActive === true
        )

        if (activeEmployees.length === 0) {
            return res.status(400).send({ Error: `No employee existed.` })
        }

        const searchedEmployee = activeEmployees.filter((employee) =>
            employee.hireDate
                .toLowerCase()
                .includes(employeeHireDate.toLowerCase())
        )

        if (searchedEmployee.length === 0) {
            return res.status(400).send({
                Error: `No employee Found with the corresponding Hire Date.`,
            })
        }

        return res.status(200).send({
            message: 'Employee Found Successfully!',
            data: searchedEmployee,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}
