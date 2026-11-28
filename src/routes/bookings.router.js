import path from "node:path";
import { Router } from "express";
import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const DATABASE_NAME = "bookings.json";
const DATABASE_PATH = path.join(
  import.meta.dirname,
  "..",
  "data",
  DATABASE_NAME,
);

const servicesPath = path.join(
  import.meta.dirname,
  "..",
  "data",
  "services.json",
);

const manager = new BookingManager(DATABASE_PATH);
const managerService = new ServiceManager(servicesPath);

const router = Router();

//Crea una reserva
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const booking = await manager.createBooking(data);
    res.status(201).json({ status: "sucess", payload: booking.payload });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

//Crea una reserva con servicio asociado
router.post("/:bid/services/:sid", async (req, res) => {
  const bid = Number(req.params.bid);
  const sid = Number(req.params.sid);

  if (
    !Number.isInteger(bid) ||
    bid <= 0 ||
    !Number.isInteger(sid) ||
    sid <= 0
  ) {
    return res.status(400).json({
      status: "error",
      message: "Los IDs son inválidos",
    });
  }

  try {
    const service = await managerService.getServiceById(sid);
    if (!service) {
      return res.status(404).json({
        status: "not_found",
        message: "Servicio no encontrado",
      });
    }

    const booking = await manager.addServiceToBooking(bid, sid);
    if (!booking) {
      return res.status(404).json({
        status: "not_found",
        message: "Reserva no encontrada",
      });
    }
    res.status(200).json({
      status: "success",
      payload: booking,
    });
  } catch (error) {
    console.error("Detalle del error:", error);
    res.status(500).json({
      status: "error",
      message: "Error al agregar el servicio a la reserva.",
    });
  }
});

//Trae la reserva por Id
router.get("/:bid", async (req, res) => {
  const id = Number(req.params.bid);
  try {
    const booking = await manager.getBookingById(id);

    if (!booking) {
      return res.status(404).json({
        status: "not_found",
        message: "Reserva no encontrada",
      });
    }

    res.status(200).json({ status: "success", payload: booking });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al obtener la reserva" });
  }
});

export default router;
