const express = require("express");
const serverExpress = express();
const productManagerJS = require("./ProductManager");
const productManager = new productManagerJS("./products.json");
serverExpress.use(express.json());
serverExpress.use(express.urlencoded({ extended: true }));

serverExpress.get("/", (req, res) => {
  const limit = req.query.limit;
  if (!limit) {
    productManager.getProducts().then((products) => {
      return res.status(200).json(products);
    });
  } else {
    productManager.getProducts().then((products) => {
      const productsLimit = products.slice(0, parseInt(limit));
      return res.status(200).json(productsLimit);
    });
  }
});
serverExpress.get("/products", (req, res) => {
  const limit = req.query.limit;
  if (!limit) {
    productManager.getProducts().then((products) => {
      return res.status(200).json(products);
    });
  } else {
    productManager.getProducts().then((products) => {
      const productsLimit = products.slice(0, parseInt(limit));
      return res.status(200).json(productsLimit);
    });
  }
});
serverExpress.get("/products/:pid", (req, res) => {
  let idProduct = parseInt(req.params.pid);
  productManager.getProductById(idProduct).then((product) => {
    if (product === undefined) {
      return res.status(404).json({ error: "Producto no encontrado" });
    } else {
      return res.status(200).json(product);
    }
  });
});
serverExpress.post("/products", (req, res) => {
  const product = req.body;
  productManager.addProduct(product).then((productAdd) => {
    if (!productAdd) {
      return res.status(400).json({
        error:
          "El producto ya se encuentra en la lista de productos o no tiene todos los datos requeridos para agregar",
      });
    } else {
      return res.status(201).json(productAdd);
    }
  });
});
serverExpress.put("/products/:pid", (req, res) => {
  const data = req.body;
  let idProduct = parseInt(req.params.pid);
  productManager
    .updateProduct(idProduct, data)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      } else {
        return res.status(200).json(product);
      }
    })
    .catch((error) => error);
});
serverExpress.delete("/products/:pid", (req, res) => {
  let idProduct = parseInt(req.params.pid);
  productManager
    .deleteProduct(idProduct)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      } else {
        return res.status(200).json(product);
      }
    })
    .catch((error) => error);
});

serverExpress.listen(8080, () =>
  console.log("Estoy listo y escuchando el puerto 8080")
);
