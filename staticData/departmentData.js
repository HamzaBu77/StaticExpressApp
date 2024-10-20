import { v4 as uuidv4 } from 'uuid';

const departments = [
    {
        id: uuidv4(),
        departmentName: "Software Engineering",
        location: "Cabin A",
        createdDate: new Date( Date.now() ).toISOString().split( 'T' )[0],
        isActive: true
    },
    {
        id: uuidv4(),
        departmentName: "Project Management",
        location: "Cabin B",
        createdDate: new Date( Date.now() ).toISOString().split( 'T' )[0],
        isActive: true
    },
    {
        id: uuidv4(),
        departmentName: "Human Resources",
        location: "Cabin C",
        createdDate: new Date( Date.now() ).toISOString().split( 'T' )[0],
        isActive: true
    },
    {
        id: uuidv4(),
        departmentName: "Sales",
        location: "Cabin D",
        createdDate: new Date( Date.now() ).toISOString().split( 'T' )[0],
        isActive: true
    },
    {
        id: uuidv4(),
        departmentName: "Marketing",
        location: "Cabin E",
        createdDate: new Date( Date.now() ).toISOString().split( 'T' )[0],
        isActive: true
    }
];

export default departments;