import * as EmployeesRecord from '../staticRecord/employeesRecord.js'
import * as DepartmentRecord from '../staticRecord/departmentsRecord.js'

export const list = async (req, res) => {
    try {
        const where = req.query
        let response = {}

        if (Object.keys(where).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        } else if (Object.keys(where).length > 1) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const allActiveEmployees = EmployeesRecord.employees.filter(
            (employee) => employee.isActive === true
        )

        const allActiveDepartments = DepartmentRecord.departments.filter(
            (department) => department.isActive === true
        )
        if (where?.search) {
            if (allActiveEmployees.length === 0) {
                return res.status(400).send({ Error: `No Employee existed.` })
            }
            if (allActiveDepartments.length === 0) {
                return res.status(400).send({ Error: `No Department existed.` })
            }

            const departmentByName = allActiveDepartments.filter((department) =>
                department.departmentName
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )

            if (departmentByName.length !== 0) {
                const departmentIdsFindByName = departmentByName.map(
                    (department) => department.id
                )

                const employeeByDepartmentName = allActiveEmployees.filter(
                    (employee) =>
                        departmentIdsFindByName.includes(employee.departmentId)
                )

                if (employeeByDepartmentName.length !== 0) {
                    response.byDepartmentName = employeeByDepartmentName
                }
            }

            const employeeByDepartmentId = allActiveEmployees.filter(
                (employee) =>
                    employee.departmentId
                        .toLowerCase()
                        .includes(where?.search.toLowerCase())
            )

            if (employeeByDepartmentId.length !== 0) {
                response.byDepartmentId = employeeByDepartmentId
            }

            const employeeByFirstName = allActiveEmployees.filter((employee) =>
                employee.firstName
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )

            if (employeeByFirstName.length !== 0) {
                response.byFirstName = employeeByFirstName
            }

            const employeeByEmail = allActiveEmployees.filter((employee) =>
                employee.email
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )

            if (employeeByEmail.length !== 0) {
                response.byEmail = employeeByEmail
            }

            const employeeByPhoneNo = allActiveEmployees.filter((employee) =>
                employee.phone
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )

            if (employeeByPhoneNo.length !== 0) {
                response.byPhoneNo = employeeByPhoneNo
            }

            const employeeByPosition = allActiveEmployees.filter((employee) =>
                employee.position
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )

            if (employeeByPosition.length !== 0) {
                response.byPosition = employeeByPosition
            }

            const employeeByHireDate = allActiveEmployees.filter((employee) =>
                employee.hireDate
                    .toLowerCase()
                    .includes(where?.search.toLowerCase())
            )

            if (employeeByHireDate.length !== 0) {
                response.byHireDate = employeeByHireDate
            }
        }
        if (Object.keys(response).length === 0) {
            return res
                .status(400)
                .send({ Error: 'No Data Existed Regarded to the query.' })
        }
        return res.status(200).send({
            message: 'Data Found Successfully!',
            data: response,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}
