const express = require("express");
const productsRouter = require("./routers/productsRouter");
const cartsRouter = require("./routers/cartsRouter");
const serverExpress = express();

serverExpress.use(express.json());
serverExpress.use(express.urlencoded({ extended: true }));
serverExpress.use("/api/products", productsRouter);
serverExpress.use("/api/carts", cartsRouter);

serverExpress.listen(8080, () =>
  console.log("Estoy listo y escuchando el puerto 8080")
);
