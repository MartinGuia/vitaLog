// import app  from "./app.js";
// import { connectDB } from "./db.js";
// import 'dotenv/config'

// connectDB();
// app.listen(process.env.REACT_APP_PORT)
// console.log(`Serving on ${process.env.REACT_APP_PORT}`)
// app.listen(4000);
// console.log('Server on port 4000');

import app from "./app.js";
import { connectDB } from "./db.js";
// import "dotenv/config";
import { Server } from "socket.io";
import http from "http";
import 'dotenv/config';

// Conectar a la base de datos
connectDB();

// Crear el servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_FRONTEND_URI,
    credentials: true,
  },
});

// Evento cuando un usuario se conecta
io.on("connection", (socket) => {
  console.log("🔌 Nuevo usuario conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado:", socket.id);
  });
});

// Hacer que io esté disponible globalmente
app.set("io", io);

// Iniciar el servidor en el puerto especificado
server.listen(process.env.REACT_APP_PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${process.env.REACT_APP_PORT}`);
});