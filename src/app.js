import express from "express";
import morgan from "morgan";
import { createRoles } from "./libs/InitialRoles.js";
import authRoutes from "./routes/auth.routes.js";
import tiresRoutes from "./routes/tires.routes.js";
import workOrderRoutes from "./routes/workOrder.routes.js";
import clientRoutes from "./routes/client.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import deliveryOrderRoutes from "./routes/deliveryOrder.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
createRoles()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser());

app.use("/api", authRoutes); 
app.use("/api", tiresRoutes)
app.use("/api", workOrderRoutes);
app.use("/api", clientRoutes);
app.use("/api", departmentRoutes);
app.use("/api", deliveryOrderRoutes);

export default app;