import { Router } from "express";
import { privacy, handlePolicies } from "../middlewares/auth.js";
import viewsController from "../controllers/views.controller.js";

const router = Router();

router.get ('/',privacy('PRIVATED'),handlePolicies(['USER']),viewsController.mostrarProductos)
router.get('/products', privacy('PRIVATED'),handlePolicies(['USER']),viewsController.mostrarProductosPage)
router.get('/realtimeproducts',privacy('PRIVATED'),handlePolicies(['ADMIN']),viewsController.realTimeProducts)
router.get('/paneladmin',privacy('PRIVATED'),handlePolicies(['ADMIN']),viewsController.panelAdmin)
router.get('/chat',privacy('PRIVATED'),handlePolicies(['USER']), viewsController.chat)
router.get('/carts/:cid' ,privacy('PRIVATED'),handlePolicies(['USER']), viewsController.getCarrito)
router.get('/register',privacy('NO_AUTHENTICATED'),viewsController.register)
router.get('/login',privacy('NO_AUTHENTICATED'),viewsController.login)
router.get('/profile',handlePolicies(['ADMIN','USER']),viewsController.profile)


export default router;