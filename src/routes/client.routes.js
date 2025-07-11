import { Router } from "express";
import {
  registerClient,
  deleteClient,
  getClients,
  getClientById,
  editClient,
} from "../controllers/client.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";

const router = Router();

router.post("/addClient", authRequired, registerClient);

router.delete("/deleteClient/:id", authRequired, deleteClient);
router.get("/getClients", authRequired, getClients);
router.get("/getClient/:id", authRequired, getClientById);
router.put("/editClient/:id", authRequired, editClient);


export default router;
