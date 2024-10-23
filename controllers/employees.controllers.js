import * as EmployeeRecord from '../staticRecord/employeesRecord.js'
import * as DepartmentRecord from '../staticRecord/departmentsRecord.js'
import * as UUID from 'uuid'

export const create = async (req, res) => {
    try {
        const body = req?.body
        if (!body.firstName || !body.lastName || !body.email || !body.phone) {
            return res.status(400).send({
                Error: 'FirstName, LastName, Email or PhoneNo is missing.',
            })
        }

        const departmentsId = DepartmentRecord.departments.map(
            (department) => department.id
        )

        if (!departmentsId.includes(body.departmentId)) {
            return res
                .status(400)
                .send({ Error: ' No such department exist with this id! ' })
        }

        const employeesEmail = EmployeeRecord.employees.map(
            (employee) => employee.email
        )

        if (employeesEmail.includes(body.email)) {
            return res.status(400).send(' Email already Exist! ')
        }

        const employeesPhoneNo = EmployeeRecord.employees.map(
            (employee) => employee.phone
        )

        if (employeesPhoneNo.includes(body?.phone)) {
            return res
                .status(400)
                .send({ Error: ' Phone number already Exist! ' })
        }

        const create = {
            ...body,
            id: UUID.v4(),
            hireDate: new Date(Date.now()).toISOString().split('T')[0],
            isActive: true,
        }

        const employeesId = EmployeeRecord.employees.map(
            (employee) => employee.id
        )

        if (employeesId.includes(create.id)) {
            return res.status(400).send({ Error: ' Id already Exist! ' })
        }

        EmployeeRecord.employees.push(create)

        return res.status(201).send({
            message: 'Employee created successfully!',
            data: create,
        })
    } catch (error) {
        res.status(500).send({
            message: `Internal Server Error`,
            Error: error.message,
        })
    }
}

export const list = async (req, res) => {
    try {
        if (!EmployeeRecord.employees) {
            return res
                .status(400)
                .send('Employee Data is Empty, No data available to show.')
        } else {
            const activeEmployees = EmployeeRecord.employees.filter(
                (employee) => employee.isActive === true
            )

            if (activeEmployees.length === 0) {
                return res.status(204).send({ Error: `No employee to show..` })
            }

            return res.status(200).send({
                message: 'Fetched Data Successfully!',
                data: activeEmployees,
            })
        }
    } catch (error) {
        res.status(500).send({
            message: `Internal Server Error`,
            Error: error.message,
        })
    }
}

export const show = async (req, res) => {
    try {
        const params = req.params

        if (!params?.id) {
            return res.status(400).send({ Error: 'Id cannot be empty.' })
        }

        const activeEmployees = EmployeeRecord.employees.filter(
            (employee) =>
                employee.isActive === true && employee?.id === params?.id
        )

        // if (activeEmployees.length === 0) {
        //     return res.status(400).send({ Error: 'Employee Record is Empty.' })
        // }

        // const employee = activeEmployees.filter(
        //     (employee) => employee.id === id
        // )

        // if (employee.length === 0) {
        //     return res.status(400).send({
        //         Error: `Bad Request, No Employee existed with this id.`,
        //     })
        // }

        return res
            .status(200)
            .send({ message: 'Employee Found Successfully!', data: employee })
    } catch (error) {
        res.status(500).send({
            message: `Internal Server Error`,
            Error: error.message,
        })
    }
}

export const patch = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { id } = req.params
        const body = req?.body

        const activeEmployees = EmployeeRecord.employees.filter(
            (employee) => employee.isActive === true
        )

        if (activeEmployees.length === 0) {
            return res.status(400).send({ Error: 'Employee Record is Empty.' })
        }

        const allActiveDepartments = DepartmentRecord.departments.filter(
            (department) => department.isActive === true
        )

        const record = activeEmployees.find((employee) => employee.id === id)

        if (record === undefined) {
            return res
                .status(400)
                .send({ Error: 'No Employee Found with the corresponding ID.' })
        } else if (Object.keys(body).length === 0) {
            return res.status(400).send({ Error: 'No Data to patch.' })
        }

        if (body?.departmentId) {
            const checkDepartmentExist = allActiveDepartments.filter(
                (department) => department.id === body.departmentId
            )
            if (checkDepartmentExist.length === 0) {
                return res.status(400).send({
                    Error: 'the departmentId provided does not belong to any department',
                })
            }
        }

        Object.keys(body).forEach((key) => {
            if (key in record) {
                record[key] = body[key]
            }
        })

        res.status(200).send({
            message: 'Employee Updated Successfully!',
            data: record,
        })
    } catch (error) {
        res.status(500).send({
            message: `Internal Server Error`,
            Error: error.message,
        })
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res
                .status(400)
                .send({ Error: 'Id is required for deletion.' })
        }

        const index = EmployeeRecord.employees.findIndex(
            (employee) => employee.id === id
        )

        if (index < 0) {
            return res
                .status(400)
                .send({ message: 'No Employee associated to the provided ID.' })
        }

        if (!EmployeeRecord.employees[index].isActive) {
            return res.status(400).send({
                Error: `No Employee associated to the provided ID`,
            })
        }

        EmployeeRecord.employees[index].isActive = false

        return res.status(200).send({
            message: `Employe with id ${EmployeeRecord.employees[index].id} deleted successfully.`,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            Error: error.message,
        })
    }
}
