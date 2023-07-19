import {Router} from 'express'
import productsController from '../controllers/products.controller.js';

const router = Router();

/*router.get('/',async (req,res)=>{
    if (req.query.limit === undefined){
        return res.send(await prod.getProducts())
    }
    else{
        if (!isNaN(parseInt(req.query.limit))){ 
            return res.send(await prod.getProducts(req.query.limit))
     }
    }
}) */

router.get('/',productsController.getProducts)

router.get('/:pid', productsController.getProductsByID)

router.post('/', productsController.createProduct)

router.put('/:pid', productsController.updateProduct)

router.delete('/:pid', productsController.deleteProduct)

export default router;