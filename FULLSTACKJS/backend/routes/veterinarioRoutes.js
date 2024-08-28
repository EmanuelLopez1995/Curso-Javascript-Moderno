import express from "express";
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioController.js';
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// aca adentro van a ir todas las rutas relacionadas a veterinario 

//area publica
router.post('/', registrar) // esto se va a ejecutar cuando se llame a la ruta api/veterinarios(viene del index)
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword); // validar email de usuario 
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword); // leer token y almacenar nuevo password

//area privada
router.get('/perfil', checkAuth, perfil); //esto se va a ejecutar cuando se llame a la ruta api/veterinarios/perfil

export default router;