import express from "express";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const router = express.Router();

// Servir la página del chat (estático en /src/public/chat.html)
// No es estrictamente necesario, pero podemos proteger la ruta que entrega el HTML
router.get("/", authenticateJWT, (req, res) => {
  // El archivo chat.html está en src/public
  res.sendFile("chat.html", { root: "src/public" });
});

export default router;
