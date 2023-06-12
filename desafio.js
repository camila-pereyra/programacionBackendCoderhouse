class ProductManager {
  constructor() {
    this.products = [];
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
    }
  }
  getsProducts() {
    if (this.products.length === 0) {
      return "La lista de productos esta vacía";
    }
    return this.products;
  }
  getProductById(id) {
    const found = this.products.find((element) => element.id === id);
    //Si lo encuentra...
    if (found) {
      console.log(
        `El producto (ID: ${id}) se encuentró correctamente en la lista de productos`
      );
    }
    //Si no lo encuentra...
    if (!found) {
      console.log(
        `El producto que busca (id: ${id}) no se encontró en la lista de productos`
      );
    }
  }
}

const productComplete = {
  title: "Fideos",
  description: "Codito",
  price: 250,
  thumbnail: "fideo_codito.png",
  code: 18050,
  stock: 10,
};
const productCompleteTwo = {
  title: "Tomate",
  description: "Perita",
  price: 130,
  thumbnail: "tomate_perita.png",
  code: 11150,
  stock: 5,
};
const productIncomplete = {
  title: "Manzana",
  description: "Verde",
  price: 100,
  code: 15090,
  stock: 5,
};
const productManager = new ProductManager();
//AGREGAR PRODUCTOS
productManager.addProduct(productComplete);
productManager.addProduct(productIncomplete); //INTENTO AGREGAR UN PRODUCTO QUE NO TIENE TODOS LOS ATRIBUTOS NECESARIOS
productManager.addProduct(productCompleteTwo); //AGREGO UN SEGUNDO PRODUCTO
productManager.addProduct(productComplete); //INTENTO AGREGAR UN PRODUCTO QUE YA ESTA EN LA LISTA DE PRODUCTOS
productManager.addProduct(productCompleteTwo); //INTENTO AGREGAR UN PRODUCTO QUE YA ESTA EN LA LISTA DE PRODUCTOS
//MOSTRAR PRODUCTOS
console.log(productManager.getsProducts());
//BUSCAR PRODUCTOS POR ID
productManager.getProductById(1); //ENCONTRADO
productManager.getProductById(2); //ENCONTRADO
productManager.getProductById(3); //NO ENCONTRADO
