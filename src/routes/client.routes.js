import { Router } from "express";
import { registerClient } from "../controllers/client.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/addClient", registerClient);

export default router;