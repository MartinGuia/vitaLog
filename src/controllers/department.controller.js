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
    // Encuentra los departamentos y selecciona solo el nombre y el ID
    const departments = await Department.find({}).select("name _id");
    
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error al obtener los departamentos", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    //Obtener el id del usuario desde los párametros de la URL
    const departmentId = req.params.id;

    //Busca al departamento por el ID
    const departmentFound = await Department.findById(departmentId).populate("users", "-password -department");

    //Si no encuentra el usuario, responde con error 404
    if (!departmentFound) return res.status(404).json({ message: "Department not found" });

    return res.json({
      id: departmentFound._id,
      name: departmentFound.name,
      users:departmentFound.users
    })
  } catch (error) {
    console.error("Error al obtener el departamento:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}