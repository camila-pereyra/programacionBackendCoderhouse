const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log(
        "El producto que quiere agregar debe tener todos los campos completos"
      );
      return;
    }
    //VALIDACION: EL PRODUCT ESTA (O NO) EN LA LISTA DE PRODUCTOS
    const found = this.products.find(
      (element) => element.code === product.code
    );
    if (found) {
      console.log(
        `El producto que quiere agregar (code: ${product.code}) ya se encuentra en la lista de productos`
      );
      return;
    }
    const productAdd = {
      id: this.products.length + 1,
      ...product,
    };
    this.products.push(productAdd);
    this.grabarEnArchivo(this.products)
      .then(() => console.log("Archivo grabado con éxito"))
      .catch((error) => {
        console.log("No se pudo grabar el archivo");
        return error;
      });
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, "utf8", (err, data) => {
        if (err) {
          console.error("Error al leer los productos:", err);
          return reject(err);
        }
        if (data === "") {
          this.products = [];
          return resolve(this.products);
        }
        this.products = JSON.parse(data);
        return resolve(this.products);
      });
    });
  }

  getProductById(id) {
    return this.getProducts()
      .then((products) => {
        const indexProduct = products.findIndex((element) => element.id === id);
        if (indexProduct === -1) {
          console.log(
            `El producto que busca (id: ${id}) no se encontró en la lista de productos`
          );
        } else {
          return products[indexProduct];
        }
      })
      .catch((error) => {
        return error;
      });
  }
  updateProduct(id, product) {
    this.getProducts()
      .then((products) => {
        const indexProduct = products.findIndex((element) => element.id === id);

        if (indexProduct === -1) {
          console.log(
            `El producto que quiere actualizar (id: ${id}) no se encontró en la lista de productos`
          );
          return;
        }
        const productUpdate = {
          id: id,
          ...product,
        };
        products[indexProduct] = productUpdate;
        this.products = products;
        this.grabarEnArchivo(this.products)
          .then(() => console.log(`El producto ID.${id} actualizado con éxito`))
          .catch((error) => {
            console.log("No se pudo actualizar el archivo");
            return error;
          });
      })
      .catch((error) => {
        return error;
      });
  }
  deleteProduct(id) {
    this.getProducts()
      .then((products) => {
        const indexProduct = products.findIndex((element) => element.id === id);
        if (indexProduct === -1) {
          console.log(
            `El producto que quiere eliminar (id: ${id}) no se encontró en la lista de productos`
          );
        } else {
          products.splice(indexProduct, 1);
          this.products = products;
          this.grabarEnArchivo(products)
            .then(() =>
              console.log(`El producto ID.${id} fue eliminado exitosamente`)
            )
            .catch((error) => {
              console.log("No se pudo eliminar el producto");
              return error;
            });
        }
      })
      .catch((error) => {
        return error;
      });
  }
  grabarEnArchivo(products) {
    return fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, 2),
      "utf-8"
    );
  }
}

//INSTANCIA DE PRODUCT MANAGER
const productManager = new ProductManager("./products.json");

//AGREGANDO PRODUCTOS
productManager.addProduct({
  title: "Fideos",
  description: "Codito",
  price: 250,
  thumbnail: "fideo_codito.png",
  code: 18050,
  stock: 10,
});
productManager.addProduct({
  title: "Arroz",
  description: "1/2kg",
  price: 150,
  thumbnail: "arroz.png",
  code: 18030,
  stock: 20,
});
productManager.addProduct({
  title: "Ravioles",
  description: "2 planchas",
  price: 500,
  thumbnail: "ravioles.png",
  code: 18010,
  stock: 3,
});

//OBTENIENDO PRODUCTOS
productManager
  .getProducts()
  .then((productos) => {
    console.log({ productos: productos });
  })
  .catch((err) => {
    console.error("Error al obtener los productos:", err);
  });

//BUSCANDO PRODUCTOS POR ID
productManager.getProductById(3).then((productFound) => {
  productFound && console.log("Producto buscado: ", productFound);
});

//ACTUALIZANDO PRODUCTOS
productManager.updateProduct(3, {
  title: "Ravioles",
  description: "Verdura",
  price: 450,
  thumbnail: "ravioles.png",
  code: 18010,
  stock: 5,
});

//ELIMIMANDO PRODUCTO
productManager.deleteProduct(5);
