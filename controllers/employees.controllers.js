import EmployeeRecord from "../staticData/employeeData.js";
import DepartmentRecord from "../staticData/DepartmentRecord.js";
import * as UUID from "uuid";

export const create = async (req, res) => {
  try {
    const body = req?.body;
    if (!body.firstName || !body.lastName || body.email || !body.phone) {
      return res
        .status(400)
        .send({
          Error: "FirstName, LastName, Email and PhoneNo cannot be empty.",
        });
    }

    const departmentsId = DepartmentRecord.map((department) => department.id);

    if (!departmentsId.includes(departmentsId)) {
      return res.status(400).send({ Error: " No such department exist with this ! " });
    }

    const employeesEmail = EmployeeRecord.map((employee) => employee.email);

    if (employeesEmail.includes(email)) {
      return res.status(400).send(" Email already Exist! ");
    }

    const employeesPhoneNo = EmployeeRecord.map((employee) => employee.phone);

    if (employeesPhoneNo.includes(phone)) {
      return res.status(400).send({ Error: " Phone number already Exist! " });
    }

    const create = {
      id: UUID.v4(),
      firstName,
      lastName,
      email,
      phone,
      position,
      salary,
      hireDate: new Date(Date.now()).toISOString().split("T")[0],
      departmentId: 1,
      isActive: true,
    };

    const employeesId = EmployeeRecord.map((employee) => employee.id);

    if (employeesId.includes(create.id)) {
      return res.status(400).send({ Error: " Id already Exist! " });
    }

    EmployeeRecord.push(create);

    return res.status(200).send({
      message: "Employee created successfully!",
      data: create,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Internal Server Error`, Error: error.message });
  }
};

export const findAllEmployees = async (req, res) => {
  try {
    if (!EmployeeRecord) {
      return res
        .status(204)
        .send("Employee Data is Empty, No data available to show.");
    } else {
      const activeEmployees = EmployeeRecord.filter(
        (employee) => employee.isActive === true
      );

      if (activeEmployees.length === 0) {
        return res.status(400).send({ Error: `No employee Found.` });
      }

      return res.status(200).send({
        message: "Fetched Data Successfully!",
        data: activeEmployees,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: `Internal Server Error`, Error: error.message });
  }
};

export const findEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ message: "Id must be passed to fetch data of employee." });
    }

    const activeEmployees = EmployeeRecord.filter(
      (employee) => employee.isActive === true
    );

    if (activeEmployees.length === 0) {
      return res.status(400).send({ Error: "Employee Data is Empty." });
    }

    const employee = activeEmployees.filter((employee) => employee.id === id);

    if (employee.length === 0) {
      return res
        .status(404)
        .send({ message: `No employee exists with the id: ${id}` });
    }

    return res
      .status(200)
      .send({ message: "Employee Found Successfully!", data: employee });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Internal Server Error`, Error: error.message });
  }
};

export const updateEmployeeById = async (req, res) => {
  try {
    if (
      Object.keys(req.body).length === 0 ||
      Object.keys(req.body).length >= 10
    ) {
      return res.status(400).send({ Error: "BAD REQUEST." });
    }

    const { id } = req.params;
    const findIndexOfEmployee = EmployeeRecord.findIndex(
      (employee) => employee.id === id
    );

    if (findIndexOfEmployee < 0) {
      return res
        .status(400)
        .send({ Error: "No Employee Found with the corresponding ID." });
    } else if (req.body.id) {
      return res.status(401).send({ Error: "No rights to update Id." });
    } else if (req.body.departmentId) {
      return res
        .status(401)
        .send({ Error: "No rights to change department ID." });
    } else if (req.body.hireDate) {
      return res.status(401).send({ Error: "No rights to change hire date." });
    } else if (req.body.isActive) {
      return res
        .status(401)
        .send({ Error: "No rights to update isActive field." });
    }

    req.body.firstName
      ? (EmployeeRecord[findIndexOfEmployee].firstName = req.body.firstName)
      : null;
    req.body.lastName
      ? (EmployeeRecord[findIndexOfEmployee].lastName = req.body.lastName)
      : null;
    req.body.email
      ? (EmployeeRecord[findIndexOfEmployee].email = req.body.email)
      : null;
    req.body.phone
      ? (EmployeeRecord[findIndexOfEmployee].phone = req.body.phone)
      : null;
    req.body.position
      ? (EmployeeRecord[findIndexOfEmployee].position = req.body.position)
      : null;
    req.body.salary
      ? (EmployeeRecord[findIndexOfEmployee].salary = req.body.salary)
      : null;

    res.status(200).send({
      message: "Employee Updated Successfully!",
      data: EmployeeRecord[findIndexOfEmployee],
    });
  } catch (error) {
    res.status(500).send({ message: `Internal Server Error`, Error: error });
  }
};

export const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ Error: "Id must be provided to delete Employee." });
    }

    const findIndexOfEmployee = EmployeeRecord.findIndex(
      (employee) => employee.id === id
    );

    if (findIndexOfEmployee < 0) {
      return res
        .status(400)
        .send({ message: "No Employee associated to the provided ID." });
    }

    if (EmployeeRecord[findIndexOfEmployee].isActive === false) {
      return res.status(400).send({
        Error: `No Employee Found with the id: ${EmployeeRecord[findIndexOfEmployee].id}`,
      });
    }

    EmployeeRecord[findIndexOfEmployee].isActive = false;

    return res.status(200).send({
      message: `Employe with id ${EmployeeRecord[findIndexOfEmployee].id} deleted successfully.`,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", Error: error.message });
  }
};
