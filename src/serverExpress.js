const express = require("express");
const productManagerJS = require("./ProductManager");
const productManager = new productManagerJS("../products.json");
const serverExpress = express();

serverExpress.get("/", (req, res) => {
  const limit = req.query.limit;
  if (!limit) {
    productManager.getProducts().then((products) => {
      return res.send(products);
    });
  }
  productManager.getProducts().then((products) => {
    const productsLimit = products.slice(0, parseInt(limit));
    return res.send(productsLimit);
  });
});
serverExpress.get("/products", (req, res) => {
  const limit = req.query.limit;
  if (!limit) {
    productManager.getProducts().then((products) => {
      return res.send(products);
    });
  }
  productManager.getProducts().then((products) => {
    const productsLimit = products.slice(0, parseInt(limit));
    return res.send(productsLimit);
  });
});
serverExpress.get("/products/:pid", (req, res) => {
  let idProduct = parseInt(req.params.pid);
  productManager.getProductById(idProduct).then((product) => {
    return res.send(product);
  });
});
serverExpress.listen(8080, () =>
  console.log("Estoy listo y escuchando el puerto 8080")
);
