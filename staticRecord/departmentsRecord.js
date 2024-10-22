import * as UUID from 'uuid'

export const departments = [
    {
        id: UUID.v4(),
        departmentName: 'Software Engineering',
        location: 'Cabin A',
        createdDate: new Date(Date.now()).toISOString().split('T')[0],
        isActive: true,
    },
    {
        id: UUID.v4(),
        departmentName: 'Project Management',
        location: 'Cabin B',
        createdDate: new Date(Date.now()).toISOString().split('T')[0],
        isActive: true,
    },
    {
        id: UUID.v4(),
        departmentName: 'Human Resources',
        location: 'Cabin C',
        createdDate: new Date(Date.now()).toISOString().split('T')[0],
        isActive: true,
    },
    {
        id: UUID.v4(),
        departmentName: 'Sales',
        location: 'Cabin D',
        createdDate: new Date(Date.now()).toISOString().split('T')[0],
        isActive: true,
    },
    {
        id: UUID.v4(),
        departmentName: 'Marketing',
        location: 'Cabin E',
        createdDate: new Date(Date.now()).toISOString().split('T')[0],
        isActive: true,
    },
]
