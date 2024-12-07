import { Router } from "express";
import {
  login,
  register,
  logout,
  getProfileById,
  verifyToken,
  getUsers,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", authRequired,register);
router.get('/getUsers', getUsers);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile/:id", getProfileById);

export default router;
