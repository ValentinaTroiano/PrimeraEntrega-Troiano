const { Router } = require("express");
const productsController = require("../Controllers/productos.controller");

const router = Router();

//funcion administrador
function Admin(req, res, next) {

    if (req.Admin) {
        next();
    } else {
        res.json({ msg: "Error. No es Admin" });
    }
}

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);
router.post("/", Admin, productsController.createProduct);
router.put("/:id", Admin, productsController.updateProduct);
router.delete("/:id", Admin, productsController.deleteProduct);

module.exports = router;