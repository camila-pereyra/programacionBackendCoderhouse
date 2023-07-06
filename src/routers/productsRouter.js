const { Router } = require("express");
const productManagerJS = require("../ProductManager");
const productManager = new productManagerJS(" ../../products.json");

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
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
productsRouter.get("/:pid", (req, res) => {
  const idProduct = parseInt(req.params.pid);
  productManager.getProductById(idProduct).then((product) => {
    if (product === undefined) {
      return res.status(404).json({ error: "Producto no encontrado" });
    } else {
      return res.status(200).json(product);
    }
  });
});
productsRouter.post("/", (req, res) => {
  const product = req.body;
  productManager.addProduct(product).then((productAdd) => {
    console.log(productAdd);
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
productsRouter.put("/:pid", (req, res) => {
  const data = req.body;
  const idProduct = parseInt(req.params.pid);
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
productsRouter.delete("/:pid", (req, res) => {
  const idProduct = parseInt(req.params.pid);
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

module.exports = productsRouter;
