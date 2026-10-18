const { PORT, NODE_ENV } = process.env;

if (!PORT || !NODE_ENV)
  throw new Error("Algunas variables faltan --> Revisar el .env fie");

export default {
  port: Number(PORT),
  node_env: NODE_ENV,
};
