import { io } from "socket.io-client";

// Conéctate al servidor de Socket.io
const socket = io(process.env.REACT_APP_URL_BACKEND, { autoConnect: true });

socket.on("connect", () => {
  console.log("🔌 Conectado a Socket.io con ID:", socket.id);
});

export default socket;