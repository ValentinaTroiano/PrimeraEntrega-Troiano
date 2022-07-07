import { FILENAME_DATABASE } from "../server";
import { promises } from "fs";

export async function getProducts(req, res) {
  try {
    const products = await promises.readFile(FILENAME_DATABASE, "utf-8");
    res.json({ data: JSON.parse(products) });
  } catch (error) {
    res.json({ msg: `Error: ${error.message}` });
  }
}
export async function getProductById(req, res) {
  const { id } = req.params;

  try {
    if (!+id)
      throw new Error("Error. Proporcione un ID");

    const products = await promises.readFile(FILENAME_DATABASE, "utf-8");
    const productsParsed = JSON.parse(products);

    const finded = productsParsed.find((item) => item.id === +id);

    if (finded)
      res.json({ data: finded });
    else
      res.json({ msg: "Producto no encontrado" });
  } catch (error) {
    res.json({ msg: `Error: ${error.message}` });
  }
}
export async function createProduct(req, res) {
  const { name, description, thumbnail, price } = req.body;

  try {
    if (name && description && thumbnail && price) {
      const products = await promises.readFile(FILENAME_DATABASE, "utf-8");
      const productsParsed = JSON.parse(products);

      const lastProduct = productsParsed.at(-1);

      const newProduct = {
        id: lastProduct.id + 1,
        ...req.body,
      };

      const allProducts = [...productsParsed, newProduct];

      await promises.writeFile(
        FILENAME_DATABASE,
        JSON.stringify(allProducts),
        "utf-8"
      );

      res.json({ msg: `Producto ${name} creado con exito` });
    } else {
      throw new Error("Todos los campos son requeridos");
    }
  } catch (error) {
    res.json({ msg: `Error: ${error.message}` });
  }
}
export
  // Update Product
  async function updateProduct(objProd) {
  try {
    let all = await this.getAllProducts();
    all = all.map((item) => (item.id !== objProd.id ? item : objProd));

    await promises.writeFile(
      `src/data/${this.name}.json`,
      JSON.stringify(all)
    );
    return all;
  } catch (error) {
    console.log(error);
  }
}
export
  // Delete Product By ID
  async function deleteProduct(id) {
  try {
    const all = await this.getAllProducts();
    const allFilterproducts = all.filter((item) => item.id !== id);
    if (JSON.stringify(all) !== JSON.stringify(allFilterproducts)) {
      await promises.writeFile(
        `src/data/${this.name}.json`,
        JSON.stringify(allFilterproducts)
      );
      return allFilterproducts;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}