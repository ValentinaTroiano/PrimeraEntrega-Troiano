import { Router } from 'express';

const router = new Router();
import { cartProductList, createNewCart, addProductToCart, deleteProductFromCart, emptyCart } from '../controllers/cartController';

router.get( '/:id/productos', cartProductList )
router.post( '/', createNewCart )
router.post( '/:id/productos/:id_prod', addProductToCart )
router.delete( '/:id/productos/:id_prod', deleteProductFromCart )
router.delete( '/:id', emptyCart )
export default router;