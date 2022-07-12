import { FILENAME_DATABASE } from "../constants";
import { promises } from "fs";



export async function getProducts(req, res) {
  try {
    const products = await promises.readFile(FILENAME_DATABASE, "utf-8");
    res.json({ data: JSON.parse(products) });
  } catch (error) {
    res.json({ msg: `Error: ${error.message}` });
  }
}
//get producto byID
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
//nuevo producto
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
// Update Product


export async function updateProduct(req,res) {
try {
  const prodId = req.params.id
  const productFound = await productDB.getById( prodId )
  
  if ( !productFound ) {
    res.send( { error: 'Producto no encontrado' } )
  } else {
    const updateProduct = {
      id: productFound.id,
      nombre: productFound.nombre,
      descripcion: productFound.descripcion,
      precio: productFound.precio,
      stock: productFound.stock,
    }

    await productDB.updateById( updateProduct )

    res.json( updateProduct )
  }
} catch ( error ) {
  console.log( `ERROR: ${ error }` )
}

}
//eliminar producto
export async function deleteProduct ( req, res )
{
  try {
    const prodId = req.params.id
    const response = await productDB.deleteById( prodId )

    if ( !response ) {
      res.send( `El producto ${ prodId } no existe` )
    } else {
      res.send( `El prodcuto ${ prodId } fue eliminado` )
    }
  } catch ( error ) {
    console.log( `ERROR: ${ error }` )
  }
}
