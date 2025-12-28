import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { prisma } from "./src/services/database.js";

const port = 3000;

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcando correctamente");
});

const server = http.createServer(app);

// Creamos servidor sockets sobre el server HTTP,
// permitiendo solo la coneccion desde nuestro front.
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Cuando una persona entre a la app y se connecte via Socket.IO,
// se crea un objeto que representa esa conexion individual
io.on("connection", (socket) => {
  // Cada conexion tiene un id unico, que se usa despues
  // para identificar usuarios.
  console.log("Usuario conectado: ", socket.id);

  // Cuando el usuario cierra la pestaña, pierde el internet o
  // recarga la pagina se desconecta.
  socket.on("disconnect", () => {
    console.log("Usuario desconectado", socket.io);
  });
});

(async () => {
  const count = await prisma.user.count();
  console.log("Usuarios en IMPOSTOR: ", count);
})();

server.listen(port, () => {
  console.log("Funcando el game en el puerto: ", port);
});
