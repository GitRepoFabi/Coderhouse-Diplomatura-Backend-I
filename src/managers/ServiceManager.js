import { readFile, writeFile } from "node:fs/promises";

const REQUIRED_FIELDS = [
  "name",
  "description",
  "duration",
  "price",
  "category",
  "available",
];

export default class ServiceManager {
  constructor(databasePath) {
    this.databasePath = databasePath;
  }

  async #save(services) {
    await writeFile(this.databasePath, JSON.stringify(services, null, 2));
  }

  //Crea un servicio
  async addService(serviceData) {
    for (const field of REQUIRED_FIELDS) {
      if (serviceData[field] === undefined || serviceData[field] === null) {
        throw new Error(`El campo ${field} está faltante`);
      }
    }
    const data = await this.getServices();
    const id =
      data.length > 0 ? Math.max(...data.map((service) => service.id)) + 1 : 1;
    const newServices = { id, ...serviceData };
    data.push(newServices);
    await this.#save(data);
    return { payload: newServices, status: "ok" };
  }

  //Trae todos los servicios
  async getServices() {
    const data = await readFile(this.databasePath, "utf-8");
    return JSON.parse(data);
  }

  //Trae el servicios por Id
  async getServiceById(id) {
    const data = await this.getServices();
    return data.find((service) => service.id === id) ?? null;
  }

  //Modifica el servicio enviado por id
  async updateService(id, updatedData) {
    const data = await this.getServices();
    const index = data.findIndex((service) => service.id === id);
    if (index === -1) {
      throw new Error(`No se encontró el servicio con id ${id}`);
    }
    // Descarta el id del cuerpo y mergea sólo los campos válidos
    const { id: _ignoredId, ...fieldsToUpdate } = updatedData;
    const updatedService = { ...data[index], ...fieldsToUpdate };
    data[index] = updatedService;
    await this.#save(data);
    return { payload: updatedService, status: "ok" };
  }

  //Elimino el servicio enviado por Id
  async deleteService(id) {
    const services = await this.getServices();
    const filterServices = services.filter((service) => service.id !== id);
    if (services.length === filterServices.length) {
      return { payload: id, status: "Notok", message: "Not Found Services" };
    }
    await this.#save(filterServices);
    return { payload: filterServices, status: "Ok" };
  }
}
