import express from "express";
import morgan from "morgan";
import { createRoles } from "./libs/InitialRoles.js";
import authRoutes from "./routes/auth.routes.js";
import tiresRoutes from "./routes/tires.routes.js";
import workOrderRoutes from "./routes/workOrder.routes.js";
import clientRoutes from "./routes/client.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import deliveryOrderRoutes from "./routes/deliveryOrder.routes.js";
import printRoutes from "./routes/print.routes.js";
import rolesRoutes from "./routes/role.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config'
import helmet from "helmet"; 

const app = express();
createRoles()

app.use(cors({
    origin: process.env.REACT_APP_FRONTEND_URI,
    credentials: true,
}));

app.use(helmet()); // Agregar helmet para seguridad
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser());

app.use("/api", authRoutes); 
app.use("/api", tiresRoutes)
app.use("/api", workOrderRoutes);
app.use("/api", clientRoutes);
app.use("/api", departmentRoutes);
app.use("/api", deliveryOrderRoutes);
app.use("/api", rolesRoutes);
app.use("/api", printRoutes);

export default app;