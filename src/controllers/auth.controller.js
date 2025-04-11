import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
// import { TOKEN_SECRET } from "../config.js";
import Role from "../models/roles.model.js";
import { validationResult } from "express-validator";
import sanitizeInput from "../middlewares/sanitize.js";
import { format } from 'date-fns'; 

export const register = async (req, res) => {
  const { name, lastName, userName, password, department, role } = req.body;

  try {
    // Verifica si el usuario ya existe
    const userFound = await User.findOne({ userName });
    if (userFound) {
      return res.status(409).json(["El usuario " + userName + " ya existe"]);
    }

    // Verifica si el departamento existe
    const departmentFound = await Department.findById(department);
    if (!departmentFound) {
      return res.status(404).json({ message: "El departamento no existe" });
    }

    // Verifica si el rol existe
    const roleFound = await Role.findById(role);
    if (!roleFound) {
      return res.status(404).json({ message: "El rol no existe" });
    }

    // Cifra la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = new User({
      name,
      lastName,
      userName,
      password: passwordHash,
      department, // Asigna el departamento al usuario
      role, // Asigna el rol al usuario
    });

    // Guarda el usuario en la base de datos
    const userSaved = await newUser.save();

    // Actualiza el departamento para incluir al usuario
    departmentFound.users.push(userSaved._id);
    await departmentFound.save();

    return res
      .status(200)
      .json({ message: "El usuario se creo correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  // Verifica si hay errores en la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Verifica si se recibió el nombre de usuario y la contraseña
  const { userName, password } = req.body;

  try {
    const userFound = await User.findOne({ userName: req.body.userName });

    if (!userFound) {
      return res.status(404).json({
        message: ["El usuario: ", userName, " no existe"],
      });
    }

    // Gets the user's role adn department
    const roleFound = userFound.role;
    //  const departmentFound = userFound.department;

    const isMatch = await bcryptjs.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        message: ["La contraseña es incorrecta"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      role: roleFound,
    });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      role: userFound.role,
      userName: userFound.userName,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    // Obtiene todos los usuarios, excluyendo la contraseña y populando los datos relacionados
    const users = await User.find({}, "-password") // Carga solo el nombre del departamento

    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

export const getProfileById = async (req, res) => {
  try {
    // Obtén el ID del usuario desde los parámetros de la URL
    const userId = req.params.id;

    // Busca al usuario por su ID
    const userFound = await User.findById(userId);

    // Si no se encuentra el usuario, responde con un error 404
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    // Si el usuario se encuentra, responde con los detalles del usuario
    return res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      userName: userFound.userName,
      department: userFound.department, // Esto contiene la referencia a `Department`
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al obtener el perfil de usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Captura el ID del usuario desde los parámetros de la solicitud

    // Busca al usuario que se desea eliminar
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si el usuario tiene un departamento asignado, elimina su referencia del departamento
    if (user.department) {
      await Department.findByIdAndUpdate(user.department, {
        $pull: { users: id },
      });
    }

    // Elimina el usuario
    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", "", {
    expres: new Date(0),
  });
  return res.sendStatus(200);
};

export const editUser = async (req, res) => {
  const { id } = req.params; // ID del usuario a editar
  const { name, lastName, userName, password, department } = req.body;

  try {
    // Verifica si el usuario existe
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si se envía un nuevo departamento, verifica que exista
    if (department && department !== String(userFound.department)) {
      const newDepartment = await Department.findById(department);
      if (!newDepartment) {
        return res
          .status(404)
          .json({ message: "El nuevo departamento no existe" });
      }

      // Remueve al usuario del departamento actual
      if (userFound.department) {
        const currentDepartment = await Department.findById(
          userFound.department
        );
        if (currentDepartment) {
          currentDepartment.users = currentDepartment.users.filter(
            (userId) => String(userId) !== String(id)
          );
          await currentDepartment.save();
        }
      }

      // Agrega al usuario al nuevo departamento
      newDepartment.users.push(id);
      await newDepartment.save();

      // Actualiza el departamento en el usuario
      userFound.department = department;
    }

    // Actualiza otros datos del usuario
    if (name) userFound.name = name;
    if (lastName) userFound.lastName = lastName;
    if (userName) userFound.userName = userName;
    if (password) {
      const passwordHash = await bcryptjs.hash(password, 10);
      userFound.password = passwordHash;
    }

    // Guarda los cambios
    const updatedUser = await userFound.save();

    // Responde con los datos actualizados
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      userName: updatedUser.userName,
      department: updatedUser.department,
      updatedAt: updatedUser.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const userFound = await User.findById(id).populate({
      path: 'workOrders',
      populate: [
        { path: 'client' },
        { path: 'tires' },
        { path: 'createdBy', select: "name lastName" },
      ]
    });

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Formatear las fechas de cada orden de trabajo
    const formattedOrders = userFound.workOrders.map(order => ({
      ...order.toObject(),
      formattedCreatedAt: format(new Date(order.createdAt), "dd/MM/yyyy")
    }));

    res.json({
      id: userFound._id,
      workOrders: formattedOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, config.SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      userName: userFound.userName,
      role: userFound.role,
    });
  });
};
