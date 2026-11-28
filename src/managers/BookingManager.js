import { readFile, writeFile } from "node:fs/promises";

const REQUIRED_FIELDS = ["clientName", "clientEmail", "date", "time"];

export default class BookingManager {
  constructor(databasePath) {
    this.databasePath = databasePath;
  }

  async #save(bookings) {
    await writeFile(this.databasePath, JSON.stringify(bookings, null, 2));
  }

  //Crea un servicio
  async createBooking(bookingData) {
    for (const field of REQUIRED_FIELDS) {
      if (bookingData[field] === undefined || bookingData[field] === null) {
        throw new Error(`El campo ${field} está faltante`);
      }
    }
    const data = await this.getBookings();
    const id =
      data.length > 0 ? Math.max(...data.map((service) => service.id)) + 1 : 1;
    //const newBooking = { ...bookingData, status: "pending", services: [], id };
    const newBooking = { id, ...bookingData, status: "pending", services: [] };
    data.push(newBooking);
    await this.#save(data);
    return { payload: newBooking, status: "ok" };
  }

  //Trae todos los servicios
  async getBookings() {
    try {
      const data = await readFile(this.databasePath, "utf-8");
      let bookings = JSON.parse(data);
      return bookings;
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  }

  //Trae el servicios por Id
  async getBookingById(id) {
    const data = await this.getBookings();
    return data.find((booking) => booking.id === id) ?? null;
  }

  async addServiceToBooking(idBooking, idService) {
    const bookings = await this.getBookings();
    const booking = bookings.find((booking) => booking.id === idBooking);
    if (!booking) return null;

    const service = booking.services.find(
      (service) => service.service === idService,
    );
    if (service) {
      service.quantity += 1;
    } else {
      booking.services.push({ service: idService, quantity: 1 });
    }
    await this.#save(bookings);
    return booking;
  }
}
