import { Router } from "express";
import {
  login,
  register,
  logout,
  getProfileById,
  verifyToken,
  getUsers,
  editUser,
  deleteUser
} from "../controllers/auth.controller.js";
import {authRequired}  from "../middlewares/validateToken.js";
import verifyRoleAdmin  from "../middlewares/verifyRoleAdmin.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", login);


router.post("/register",  authRequired, verifyRoleAdmin ,register);
router.get('/getUsers', getUsers);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile/:id", verifyRoleAdmin ,getProfileById);
router.put("/editUser/:id", verifyRoleAdmin , editUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
