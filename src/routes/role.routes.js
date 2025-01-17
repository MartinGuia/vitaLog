import { Router } from "express";
import * as rolesController from "../controllers/role.controller.js"
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get ("/get-roles", authRequired, rolesController.getRoles)

export default router;