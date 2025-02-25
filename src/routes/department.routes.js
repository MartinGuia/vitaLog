import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerDepartment,
  getDepartments,
  getDepartmentById,
} from "../controllers/department.controller.js";

const router = Router();

router.post("/department", authRequired, registerDepartment);
router.get("/departments", authRequired, getDepartments);
router.get("/department/:id", authRequired, getDepartmentById);

export default router;
