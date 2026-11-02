import express from "express";
import serviceRouter from "./routes/services.router.js";

const app = express();

// Logger - userId - permiso del user
app.use((req, res, next) => {
  console.info(`${req.method} ${req.url}`);
  next();
});

// Middleware para parseo de json
app.use(express.json());

// API health
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is up!",
  });
});

//Routers
app.use("/api/services", serviceRouter);

// Middleware que devuelve una respuesta si el recurso/endpoint consultado no existe
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Ruta no encontrada",
  });
});

export default app;
