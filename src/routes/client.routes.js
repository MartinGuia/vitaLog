import { Router } from "express";
import { registerClient, getClients, getClientById, editClient} from "../controllers/client.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/addClient", registerClient);
router.get("/getClients", getClients);
router.get("/getClient/:id", getClientById);
router.put("/editClient/:id", editClient);

export default router;