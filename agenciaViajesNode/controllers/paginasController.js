import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio =  async (req, res)=>{ // esto es el routing

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimoniales.findAll({limit: 3}));

    //consultar 3 viajes del modelo viaje
    try {
        const resultado = await Promise.all( promiseDB );
        res.render('inicio', { // esto lo haría el controlador
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        }); 
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res)=>{
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res)=>{

    //consultar BD
    const viajes = await Viaje.findAll(); //trae todos los resultados de la tabla

    res.render('viajes', {
        pagina: 'PROXIMOS VIAJES',
        viajes // pasamos el resultado de la consulta a la vista
    });
}

const paginaTestimoniales = async (req, res)=>{
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) =>{
    // params trae lo que mandas como parametro, el .viaje es lo que pusimos despues de los dos puntos en la ruta viajes/:viaje
    console.log(req.params.viaje) 

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where : { slug }})

        res.render('viaje', {
            pagina: 'Informacion viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}