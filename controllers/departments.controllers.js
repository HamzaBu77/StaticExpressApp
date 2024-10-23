import * as DepartmentRecord from '../staticRecord/departmentsRecord.js'
import * as UUID from 'uuid'

export const create = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const body = req.body

        if (!body.departmentName || !body.location) {
            return res
                .status(400)
                .send({ Error: 'Department name or location is missing.' })
        }

        const findDepartment = DepartmentRecord.departments.filter(
            (department) =>
                department.departmentName === body.departmentName &&
                department.location === body.location
        )

        if (findDepartment.length !== 0) {
            return res.status(400).send({
                Error: 'Department already exist on the same location.',
            })
        }

        const createNewDepartment = {
            id: UUID.v4(),
            ...body,
            createdDate: new Date(Date.now()).toISOString().split('T')[0],
            isActive: true,
        }

        const checkDepartmentIdAlreadyExists =
            DepartmentRecord.departments.findIndex(
                (department) => department.id === createNewDepartment.id
            )

        if (checkDepartmentIdAlreadyExists !== -1) {
            return res
                .status(400)
                .send({ Error: 'Department with Id already Existed.' })
        }

        DepartmentRecord.departments.push(createNewDepartment)

        return res.status(201).send({
            message: 'Department Created Successfully!',
            data: createNewDepartment,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const list = async (req, res) => {
    try {
        if (DepartmentRecord.departments.length === 0) {
            return res
                .status(404)
                .send({ Error: 'No Data Found against Departments.' })
        } else {
            const allActiveDepartments = DepartmentRecord.departments.filter(
                (department) => department.isActive === true
            )

            if (allActiveDepartments.length === 0) {
                return res.status(400).send({ Error: `No department Found.` })
            }

            return res.status(200).send({
                messgae: 'Departments Found Successfully!',
                data: allActiveDepartments,
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const show = async (req, res) => {
    try {
        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).send({ Error: 'Id is empty or null.' })
        }

        const activeDepartments = DepartmentRecord.departments.filter(
            (department) => department.isActive === true
        )

        if (activeDepartments.length === 0) {
            return res
                .status(400)
                .send({ Error: `No department existed with this id.` })
        }

        const departmentSearch = activeDepartments.find(
            (department) => department.id === id
        )

        if (!departmentSearch) {
            return res
                .status(404)
                .send({ Error: `Department doesnot exist with this id` })
        }

        res.status(200).send({
            mesasge: 'Department Found Successfully!',
            data: departmentSearch,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const patch = async (req, res) => {
    try {
        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).send({ Error: 'Id is empty or null.' })
        }

        const body = req?.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({
                Error: 'nothing provided in body to patch the required record.',
            })
        }

        const activeDepartments = DepartmentRecord.departments.filter(
            (department) => department.isActive === true
        )

        if (activeDepartments.length === 0) {
            return res
                .status(400)
                .send({ Error: `No department Found with this id ${id}.` })
        }

        const record = activeDepartments.find(
            (department) => department.id === id
        )

        if (Object.keys(record).length === 0) {
            return res.status(400).send({
                Error: 'No Department Found with the corresponding ID.',
            })
        } else if (
            record.departmentName === body.departmentName &&
            record.location === body.location
        ) {
            return res.status(409).send({
                Error: 'Already have the same values to the given attributes.',
            })
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
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}

export const remove = async (req, res) => {
    try {
        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({ Error: 'BAD REQUEST.' })
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).send({ Error: 'Id is empty or null.' })
        }

        const activeDepartments = DepartmentRecord.departments.filter(
            (department) => department.isActive === true
        )

        if (activeDepartments.length === 0) {
            return res
                .status(400)
                .send({ Error: `No department Found with this id.` })
        }

        const record = activeDepartments.filter(
            (department) => department.id === id
        )

        if (record.length === 0) {
            return res.status(400).send({
                Error: 'No Department Found with the corresponding ID.',
            })
        }

        const index = activeDepartments.findIndex(
            (department) => department.id === id
        )

        DepartmentRecord.departments[index].isActive = false

        return res.status(200).send({
            message: 'Department Deleted Successfully!',
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error.',
            Error: error.message,
        })
    }
}
