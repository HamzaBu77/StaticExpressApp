import * as UUID from 'uuid'
import * as DepartmentRecord from './departmentsRecord.js'

const departmentsId = DepartmentRecord.departments.map(
    (department) => department.id
)
export const employees = [
    {
        id: UUID.v4(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        position: 'Software Engineer',
        salary: 70000,
        hireDate: '2022-01-15',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
    {
        id: UUID.v4(),
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '2345678901',
        position: 'Project Manager',
        salary: 85000,
        hireDate: '2021-05-10',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
    {
        id: UUID.v4(),
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily.johnson@example.com',
        phone: '3456789012',
        position: 'HR Specialist',
        salary: 60000,
        hireDate: '2023-03-20',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
    {
        id: UUID.v4(),
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@example.com',
        phone: '4567890123',
        position: 'Data Analyst',
        salary: 65000,
        hireDate: '2022-06-01',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
    {
        id: UUID.v4(),
        firstName: 'Sarah',
        lastName: 'Davis',
        email: 'sarah.davis@example.com',
        phone: '5678901234',
        position: 'Marketing Coordinator',
        salary: 55000,
        hireDate: '2021-09-15',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
    {
        id: UUID.v4(),
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@example.com',
        phone: '6789012345',
        position: 'UI/UX Designer',
        salary: 75000,
        hireDate: '2020-04-20',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
    {
        id: UUID.v4(),
        firstName: 'Jessica',
        lastName: 'Martinez',
        email: 'jessica.martinez@example.com',
        phone: '7890123456',
        position: 'Sales Executive',
        salary: 60000,
        hireDate: '2022-02-14',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
    {
        id: UUID.v4(),
        firstName: 'Daniel',
        lastName: 'Anderson',
        email: 'daniel.anderson@example.com',
        phone: '8901234567',
        position: 'IT Support Specialist',
        salary: 50000,
        hireDate: '2023-05-01',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
    {
        id: UUID.v4(),
        firstName: 'Laura',
        lastName: 'Thomas',
        email: 'laura.thomas@example.com',
        phone: '9012345678',
        position: 'Business Analyst',
        salary: 70000,
        hireDate: '2022-11-22',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
    {
        id: UUID.v4(),
        firstName: 'Kevin',
        lastName: 'Jackson',
        email: 'kevin.jackson@example.com',
        phone: '0123456789',
        position: 'Account Manager',
        salary: 80000,
        hireDate: '2021-07-30',
        departmentId:
            departmentsId[Math.floor(Math.random() * departmentsId.length)],
        isActive: true,
    },
]
