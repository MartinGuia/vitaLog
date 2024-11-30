import Department from "../models/department.model.js";

export const registerDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const departmentFound = await Department.findOne({ name });
    if (departmentFound)
      return res.status(409).json({ message: "Department already exists" });

    const newDepartment = new Department({
      name,
    });
    const departmentSaved = await newDepartment.save();

    res.json({ 
      id: departmentSaved._id,
      name: departmentSaved.name,
     })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(200).json(departments);
  } catch (error) {
    console.error("Error al obtener los departamentos", error)
    res.status(500).json({ succes: false, message: "error interno del servidor" });
  }
};