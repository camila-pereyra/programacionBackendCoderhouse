const { Router } = require("express");
const cartJS = require("../Cart");
const cart = new cartJS(" ../../carrito.json");

const cartsRouter = Router();

cartsRouter.post("/", (req, res) => {
  cart.addCart().then((cart) => {
    return res.status(201).json(cart);
  });
});
cartsRouter.get("/:cid", (req, res) => {
  const idCart = parseInt(req.params.cid);
  cart.getCartById(idCart).then((cart) => {
    if (cart === undefined) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    } else {
      return res.status(200).json(cart);
    }
  });
});
cartsRouter.post("/:cid/product/:pid", (req, res) => {
  const idCart = parseInt(req.params.cid);
  const idProd = parseInt(req.params.pid);
  cart.addProductInCart(idCart, idProd).then((data) => {
    if (data === undefined) {
      return res.status(404).json({ error: "Carrito o producto no existe" });
    } else {
      return res.status(200).json(data);
    }
  });
});

module.exports = cartsRouter;
