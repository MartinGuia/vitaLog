import { Router } from "express";
import { registerClient, getClients} from "../controllers/client.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/addClient", registerClient);
router.get("/getClients", getClients);

export default router;