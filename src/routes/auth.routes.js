import { Router } from "express";
import {
  login,
  register,
  logout,
  getProfileById,
  verifyToken,
  getUsers,
  editUser
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", login);
router.post("/register", authRequired, register);
router.get('/getUsers', getUsers);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile/:id", getProfileById);
router.put("/editUser/:id", editUser);

export default router;
