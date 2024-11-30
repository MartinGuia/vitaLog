import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { name, lastName, userName, department, password } = req.body;

  try {
    const userFound = await User.findOne({ userName });
    if (userFound)
      return res.status(409).json(["User already exists"]);

    const passwordHash = await bcryptjs.hash(password, 10);

    const newUser = new User({
      name,
      lastName,
      userName,
      // department,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      userName: userSaved.userName,
      // department: userSaved.department,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userFound = await User.findOne({ userName });

    if (!userFound) {
      return res.status(404).json({
        message: ["The User does not exist"],
      });
    }

    const isMatch = await bcryptjs.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token,);
    res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
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
    // Obtiene todos los usuarios de la base de datos, excluyendo la contraseña por seguridad
    const users = await User.find({}, '-password') // Elimina el campo de password de los resultados

    // Envía la lista de usuarios al frontend en formato JSON
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", "", {
    expres: new Date(0),
  });
  return res.sendStatus(200);
};

export const getProfileById = async (req, res) => {
  try {
    // Obtén el ID del usuario desde los parámetros de la URL
    const userId = req.params.id;

    // Busca al usuario por su ID
    const userFound = await User.findById(userId).populate('tires').populate('workOrders');

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
      tires: userFound.tires,           // Esto contiene las llantas relacionadas
      // clients: userFound.clients,       // Esto contiene los clientes relacionados
      workOrders: userFound.workOrders, // Esto contiene las órdenes de trabajo relacionadas
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });

  } catch (error) {
    console.error("Error al obtener el perfil de usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// export const profile = async (req, res) => {
//   const userFound = await User.findById(req.user.id);
//   if (!userFound) return res.status(404).json({ message: "User not found" });

//   return res.json({
//     id: userFound._id,
//     name: userFound.name,
//     lastName: userFound.lastName,
//     userName: userFound.userName,
//     createdAt: userFound.createdAt,
//     updateAt: userFound.updatedAt,
//   });
// };

export const verifyToken = async (req, res) => {
  const {token} = req.cookies

  if(!token) return res.status(401).json({ message: "Unauthorized"});

  jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
    if (err) return res.status(401).json({message: "Unauthorized"})

      const userFound = await User.findById(user.id);
      if (!userFound) return res.status(401).json({ message: "Unauthorized" });

      return res.json({
        id: userFound._id,
        name: userFound.name,
        lastName: userFound.lastName,
        userName: userFound.userName,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
      });
  })
}
