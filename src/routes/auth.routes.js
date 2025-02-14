import { Router } from "express";
import {
  login,
  register,
  logout,
  getProfileById,
  verifyToken,
  getUsers,
  editUser,
  deleteUser,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";
import { loginLimiter } from "../middlewares/loginLimit.js";
import sanitizeInput from "../middlewares/sanitize.js";
import { body } from "express-validator";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post(
  "/login",
  [
    body("userName").trim().escape(), // Limpia espacios y caracteres especiales
    body("password").trim().escape(),
    sanitizeInput, // Aplica sanitización adicional
  ],
  loginLimiter,
  login
);

router.post("/register", authRequired, verifyRoleAdmin, register);
router.get("/getUsers", authRequired, getUsers);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile/:id", authRequired, verifyRoleAdmin, getProfileById);
router.put("/editUser/:id", authRequired, verifyRoleAdmin, editUser);
router.delete("/deleteUser/:id", authRequired, verifyRoleAdmin, deleteUser);

export default router;
