import dotenv from "dotenv";
dotenv.config();

const { PORT, NODE_ENV } = process.env;

if (!PORT || !NODE_ENV)
  throw new Error("Algunas variables faltan --> Revisar el .env file");

export default {
  port: Number(PORT),
  node_env: NODE_ENV,
};
