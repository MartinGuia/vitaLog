import { io } from "socket.io-client";

// Conéctate al servidor de Socket.io
const socket = io("http://localhost:4000", { autoConnect: true });

socket.on("connect", () => {
  console.log("🔌 Conectado a Socket.io con ID:", socket.id);
});

export default socket;