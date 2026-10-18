# Pre-Entrega1

## Descripción del Proyecto

Este proyecto es una aplicación Node.js que gestiona un catálogo de servicios. Permite listar, obtener, agregar, actualizar y eliminar servicios a través de un `ServiceManager` que persiste los datos en un archivo JSON.

## Instalación

Para instalar las dependencias del proyecto, navega hasta la raíz del proyecto y ejecuta el siguiente comando:

```bash
npm install
```

## Cómo Ejecutar

Para iniciar la aplicación en modo desarrollo con `nodemon` (observando cambios y reiniciando el servidor), ejecuta el siguiente script:

```bash
npm run dev
```

Este comando utilizará el archivo `.env` para cargar las variables de entorno.

## Variables de Entorno Necesarias

El proyecto requiere las siguientes variables de entorno, que deben configurarse en un archivo `.env` en la raíz del proyecto:

- `PORT`: El puerto en el que se ejecutará el servidor.
- `NODE_ENV`: El entorno de la aplicación (por ejemplo, `development`, `production`).

Ejemplo de archivo `.env`:

```
PORT=8080
NODE_ENV=development
```

## Descripción del Recurso `services`

El recurso `services` se gestiona a través del archivo `src/data/services.json`. Es un array de objetos, donde cada objeto representa un servicio y tiene las siguientes propiedades:

- `id`: `number` - Identificador único del servicio.
- `name`: `string` - Nombre del servicio.
- `description`: `string` - Descripción detallada del servicio.
- `duration`: `number` - Duración del servicio en minutos.
- `price`: `number` - Precio del servicio.
- `category`: `string` - Categoría a la que pertenece el servicio (por ejemplo, "Estetica", "Bienestar").
- `available`: `boolean` - Indica si el servicio está disponible.

Ejemplo de un servicio:

```json
{
  "id": 1,
  "name": "Corte de pelo",
  "description": "Corte de pelo con lavado incluido",
  "duration": 20,
  "price": 15000,
  "category": "Estetica",
  "available": true
}
```

## Ejemplos de Uso de los Métodos del `ServiceManager`

El `ServiceManager` (`src/managers/ServiceManager.js`) proporciona los siguientes métodos para interactuar con los servicios. Los ejemplos a continuación son extraídos de `app.js`.

### `getServices()` - Obtener todos los servicios

Este método devuelve un array con todos los servicios disponibles.

```javascript
console.log({ "Todos los servicios": await manager.getServices() });
```

### `getServiceById(id)` - Obtener un servicio por su ID

Este método busca y devuelve un servicio específico por su `id`.

```javascript
console.log("Busqueda de servicio: \n");
console.log({ "service #2 ": await manager.getServiceById(2) });
```

### `addService(serviceData)` - Crear un nuevo servicio

Este método agrega un nuevo servicio al catálogo. `serviceData` debe ser un objeto con todas las propiedades requeridas (`name`, `description`, `duration`, `price`, `category`, `available`).

```javascript
const newService = {
  name: "Corte de pelo premium",
  description: "Corte con una super tijera",
  duration: 30,
  price: 30000,
  category: "Bienestar",
  available: true,
};

const createdService = await manager.addService(newService);
console.log("Agregar un servicio: \n");
console.log("new service", createdService);
```

### `deleteService(id)` - Eliminar un servicio por su ID

Este método elimina un servicio del catálogo utilizando su `id`.

```javascript
console.log("Elimina el servicio #4: \n");
console.log(await manager.deleteService(4));
```

### `updateService(id, updatedData)` - Modificar un servicio por su ID

Este método actualiza un servicio existente con los datos proporcionados. Si el servicio no se encuentra, retorna `{ payload: searchedService, status: "NotOK" }`.

```javascript
// Ejemplo de uso (no presente en app.js, pero disponible en ServiceManager.js)
// const updatedService = await manager.updateService(1, { price: 16000 });
// console.log("Servicio actualizado:", updatedService);
```
