import path from "node:path";
import envConfig from "./src/config/env.config.js";
import dotenv from "dotenv";
import ServiceManager from "./src/managers/ServiceManager.js";

dotenv.config();

const DATABASE_NAME = "services.json";
const DATABASE_PATH = path.join(
  import.meta.dirname,
  "src",
  "data",
  DATABASE_NAME,
);

const manager = new ServiceManager(DATABASE_PATH);

//Obtiene todos los servicios
console.log({ "Todos los servicios": await manager.getServices() });

//Obtiene el servicio 2
console.log("\nBusqueda de servicio: \n");
console.log({ "service #2 ": await manager.getServiceById(2) });

//Crea un nuevo servicio
const newService = {
  name: "Corte de pelo premium",
  description: "Corte con una super tijera",
  duration: 30,
  price: 30000,
  category: "Bienestar",
  available: true,
};

const createdService = await manager.addService(newService);
console.log("\nAgregar un servicio: \n");
console.log("new service", createdService);

//Actualizo el precio del producto 4
const updatedService = await manager.updateService(4, { price: 16000 });
console.log("Servicio actualizado:", updatedService);

//Elimina el servicio 4

console.log("\nElimina el servicio #4: \n");
console.log(await manager.deleteService(4));
