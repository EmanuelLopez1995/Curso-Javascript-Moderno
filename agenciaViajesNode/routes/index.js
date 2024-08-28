import  express  from 'express';
import { paginaInicio, 
        paginaNosotros, 
        paginaViajes, 
        paginaTestimoniales, 
        paginaDetalleViaje
} from '../controllers/paginasController.js';
import {
    guardarTestimonial
}from '../controllers/testimonialController.js'

const router = express.Router();

//express soporte, get, post, delete etc. 
// la barra diagonal simboliza entiendo la pagina principal 
// en el callback va el request (lo que yo envio) response es lo que express te envia
// el get se ejecuta cuando visitas una url
router.get('/', paginaInicio)

router.get('/nosotros', paginaNosotros)
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje); // el :slug es un comodin 
router.get('/testimoniales', paginaTestimoniales)
router.post('/testimoniales', guardarTestimonial)

export default router;