const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  addProduct(product) {
    //VALIDACION: CAMPOS OBLIGATORIOS
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      return console.log(
        "El producto que quiere agregar debe tener todos los campos completos"
      );
    }
    //VALIDACION: EL PRODUCT ESTA (O NO) EN LA LISTA DE PRODUCTOS
    const found = this.products.find(
      (element) => element.code === product.code
    );
    //Si lo encuentra retorna la leyenda que ya se encuentra el producto en la lista de productos
    if (found) {
      console.log(
        `El producto que quiere agregar (code: ${product.code}) ya se encuentra en la lista de productos`
      );
    }
    //Si no lo encuentra lo agrega...
    if (!found) {
      const productAdd = {
        id: this.products.length + 1,
        ...product,
      };
      this.products.push(productAdd);
      //Escribo/sobreescribo en el archivo el array de productos
      fs.promises
        .writeFile(this.path, JSON.stringify(this.products, null, 2))
        .then(() => console.log("Archivo grabado con éxito"))
        .catch((error) => {
          console.log("No se pudo grabar el archivo");
          return error;
        });
    }
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
        //Si lo encuentra...
        if (indexProduct !== -1) {
          console.log(
            `El producto buscado (ID: ${id}):\n`,
            products[indexProduct]
          );
        }
        //Si no lo encuentra...
        if (indexProduct === -1) {
          console.log(
            `El producto que busca (id: ${id}) no se encontró en la lista de productos`
          );
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
        //Si lo encuentra...
        if (indexProduct !== -1) {
          products[indexProduct] = { id: id, ...product };
          fs.promises
            .writeFile(this.path, JSON.stringify(products, null, 2))
            .then(() => console.log("Archivo actualizado con éxito"))
            .catch((error) => {
              console.log("No se pudo actualizar el archivo");
              return error;
            });
        }
        //Si no lo encuentra...
        if (indexProduct === -1) {
          console.log(
            `El producto que quiere actualizar (id: ${id}) no se encontró en la lista de productos`
          );
        }
      })
      .catch((error) => {
        return error;
      });
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
  title: "Tomate",
  description: "Perita",
  price: 130,
  thumbnail: "tomate_perita.png",
  code: 11150,
  stock: 5,
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
productManager.getProductById(1); //ENCONTRADO
productManager.getProductById(3); //NO ENCONTRADO

//ACTUALIZANDO PRODUCTOS
productManager.updateProduct(1, {
  title: "Fideos tallarines",
  description: "1/2kg",
  price: 250,
  thumbnail: "fideo_codito.png",
  code: 18050,
  stock: 10,
});
productManager.updateProduct(2, {
  title: "Tomate perita",
  description: "1kg",
  price: 130,
  thumbnail: "tomate_perita.png",
  code: 11150,
  stock: 5,
});
