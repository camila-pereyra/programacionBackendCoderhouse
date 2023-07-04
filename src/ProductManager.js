const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  addProduct(product) {
    return this.getProducts()
      .then((products) => {
        if (
          !product.title ||
          !product.description ||
          !product.price ||
          !product.thumbnail ||
          !product.code ||
          !product.stock
        ) {
          return;
        }
        const found = products.find((element) => element.code === product.code);
        if (found) {
          return;
        } else {
          const productAdd = {
            id: products.length + 1,
            ...product,
          };
          products.push(productAdd);
          this.grabarEnArchivo(products)
            .then(() => console.log("Archivo grabado con éxito"))
            .catch((error) => {
              console.log("No se pudo grabar el archivo");
              return error;
            });
          return productAdd;
        }
      })
      .catch((error) => error);
  }
  getProducts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, "utf8", (err, data) => {
        if (err) {
          console.error("Error al leer los productos:", err);
          return reject(err);
        }
        if (data === "") {
          return resolve([]);
        }
        return resolve(JSON.parse(data));
      });
    });
  }
  getProductById(id) {
    return this.getProducts()
      .then((products) => {
        const indexProduct = products.findIndex((element) => element.id === id);
        if (indexProduct === -1) {
          return undefined;
        } else {
          return products[indexProduct];
        }
      })
      .catch((error) => {
        return error;
      });
  }
  updateProduct(id, product) {
    return this.getProducts()
      .then((products) => {
        const index = products.findIndex((element) => {
          return element.id === id;
        });
        if (index === -1) {
          return;
        } else {
          const productUpdate = {
            id: id,
            title: product.title || products[index].title,
            description: product.description || products[index].description,
            price: product.price || products[index].price,
            thumbnail: product.thumbnail || products[index].thumbnail,
            code: product.code || products[index].code,
            stock: product.stock || products[index].stock,
          };
          products[index] = productUpdate;
          this.grabarEnArchivo(products)
            .then(() =>
              console.log(`El producto ID.${id} actualizado con éxito`)
            )
            .catch((error) => {
              console.log("No se pudo actualizar el archivo");
              return error;
            });
          return productUpdate;
        }
      })
      .catch((error) => error);
  }
  deleteProduct(id) {
    return this.getProducts()
      .then((products) => {
        const index = products.findIndex((element) => {
          return element.id === id;
        });
        if (index === -1) {
          return;
        } else {
          products.splice(index, 1);
          this.grabarEnArchivo(products)
            .then(() =>
              console.log(`El producto ID.${id} actualizado con éxito`)
            )
            .catch((error) => {
              console.log("No se pudo actualizar el archivo");
              return error;
            });
          return { deleted: true };
        }
      })
      .catch((error) => error);
  }
  grabarEnArchivo(products) {
    return fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, 2),
      "utf-8"
    );
  }
}

module.exports = ProductManager;
