const fs = require("fs");

class Cart {
  constructor(path) {
    this.path = path;
  }
  addCart() {
    return this.getCarts()
      .then((carts) => {
        const cartAdd = {
          id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
          products: [],
        };
        carts.push(cartAdd);
        this.grabarEnArchivo(carts);
        return cartAdd;
      })
      .catch((error) => error);
  }
  getCarts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, "utf8", (err, data) => {
        if (err) {
          console.error("Error al leer los productoasasdfs:", err);
          return reject(err);
        }
        if (data === "") {
          return resolve([]);
        }
        return resolve(JSON.parse(data));
      });
    });
  }
  getCartById(id) {
    return this.getCarts()
      .then((carts) => {
        const indexCart = carts.findIndex((element) => element.id === id);
        if (indexCart === -1) {
          return undefined;
        } else {
          return carts[indexCart];
        }
      })
      .catch((error) => {
        return error;
      });
  }
  addProductInCart = async (idCart, idProduct) => {
    let cartIndex = await this.getCarts().then((carts) =>
      carts.findIndex((cart) => cart.id === idCart)
    );
    let inventary = await this.loadInventary();
    let productExist = inventary.findIndex((prod) => prod.id === idProduct);
    if (productExist === -1 || cartIndex === -1) {
      return undefined;
    }
    if (productExist !== -1 && cartIndex !== -1) {
      const carts = await this.getCarts();
      const indexProduct = carts[cartIndex].products.findIndex(
        (product) => product.id === idProduct
      );
      if (indexProduct === -1) {
        const productAdd = {
          id: idProduct,
          quantity: 1,
        };
        carts[cartIndex].products.push(productAdd);
      } else {
        carts[cartIndex].products[indexProduct].quantity++;
      }
      this.grabarEnArchivo(carts);
      return carts;
    }
  };
  loadInventary() {
    return new Promise((resolve, reject) => {
      fs.readFile("./products.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error al leer los productoaaaaaaaads:", err);
          return reject(err);
        }
        if (data === "") {
          return resolve([]);
        }
        return resolve(JSON.parse(data));
      });
    });
  }
  grabarEnArchivo(carts) {
    fs.promises
      .writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8")
      .then(() => "Carrito grabado con exito")
      .catch((error) => error);
  }
}

module.exports = Cart;
