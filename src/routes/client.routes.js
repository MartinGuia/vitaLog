import { Router } from "express";
import { registerClient, deleteClient, getClients, getClientById, editClient} from "../controllers/client.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import verifyRoleAdmin  from "../middlewares/verifyRoleAdmin.js";

const router = Router();

router.post("/addClient", verifyRoleAdmin,registerClient);

router.delete("/deleteClient/:id", authRequired, verifyRoleAdmin, deleteClient);
router.get("/getClients", getClients);
router.get("/getClient/:id", getClientById);
router.put("/editClient/:id", editClient);

export default router;