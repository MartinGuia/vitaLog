import { io } from "socket.io-client";

// Conéctate al servidor de Socket.io
const socket = io("http://vitabajio2.dynalias.net:4001", { autoConnect: true });

socket.on("connect", () => {
  console.log("🔌 Conectado a Socket.io con ID:", socket.id);
});

export default socket;