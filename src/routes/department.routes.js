import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerDepartment,
  getDepartments,
  getDepartmentById,
} from "../controllers/department.controller.js";

const router = Router();

router.post("/department", registerDepartment);
router.get("/departments", getDepartments);
router.get("/department/:id", getDepartmentById);

export default router;
