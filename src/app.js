import express from "express";
import config from "./config.js";
import productsRoutes from "./routes/products.routes.js";

const app = express();

// settings

app.set("port", config.port);

app.use(express.json()); // para que express entienda los formatos json
app.use(express.urlencoded({ extended: false })); // para que entienda los formatos html que vienen desde formularios

app.use(productsRoutes)

export default app;