import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { registerDepartment, getDepartments } from "../controllers/department.controller.js";

const router = Router();

router.post("/department", authRequired,registerDepartment)
router.get("/departments", getDepartments)

export default router;