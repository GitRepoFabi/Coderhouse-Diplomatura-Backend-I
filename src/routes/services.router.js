import path from "node:path";
import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";

const DATABASE_NAME = "services.json";
const DATABASE_PATH = path.join(
  import.meta.dirname,
  "..",
  "data",
  DATABASE_NAME,
);

const manager = new ServiceManager(DATABASE_PATH);

const router = Router();

//Trae todos los servicios
router.get("/", async (req, res) => {
  const queryParams = req.query;
  try {
    const services = await manager.getServices();
    res.json({ status: "sucess", payload: services });
  } catch (error) {
    res
      .status(404)
      .json({ status: "error", message: "Error al obtener los servicios" });
  }
});

//Trae el servicios por Id
router.get("/:sid", async (req, res) => {
  const id = Number(req.params.sid);
  try {
    const service = await manager.getServiceById(id);

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "No existe el servicio consultado",
      });
    }

    res.status(200).json({ status: "sucess", payload: service });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al obtener los servicios" });
  }
});

//Crea un servicio
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const service = await manager.addService(data);
    res.status(201).json({ status: "sucess", payload: service.payload });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

//Modifica un servicio
router.put("/:sid", async (req, res) => {
  const id = Number(req.params.sid);
  try {
    const data = req.body;
    const updateService = await manager.updateService(id, data);
    res.status(200).json({ status: "sucess", payload: updateService.payload });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

//Eliminar un servicio
router.delete("/:sid", async (req, res) => {
  const id = Number(req.params.sid);
  try {
    const deleteService = await manager.deleteService(id);

    if (!deleteService) {
      return res.status(404).send({
        status: "error",
        message: "No se encontró el servicio a eliminar",
      });
    }

    res.status(200).json({
      status: "sucess",
      payload: `Se ha eliminado el servicio ${deleteService.id}`,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
