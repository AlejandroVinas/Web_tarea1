import express from "express";
import http from "http";
import { Server as IOServer } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { verifySocketJWT } from "./middleware/authenticateJWT.js";

const app = express();
const server = http.createServer(app);
const io = new IOServer(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("src/public"));

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/chat", chatRoutes);

// Conexión a MongoDB (sin opciones deprecadas)
mongoose.connect(config.mongoURI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error MongoDB:", err));

// Socket.IO auth middleware
io.use(async (socket, next) => {
  try {
    await verifySocketJWT(socket);
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  const user = socket.user; // puesto por verifySocketJWT
  console.log(`Usuario conectado al chat: ${user.username}`);

  socket.on("message", (text) => {
    const msg = { user: user.username, text, time: new Date() };
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${user.username}`);
  });
});

server.listen(config.port, () => {
  console.log(`Servidor en http://localhost:${config.port}`);
});