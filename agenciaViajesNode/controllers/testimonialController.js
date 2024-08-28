import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) =>{
    console.log(req.body); //el body es lo que el usuario pone en el formulario

    //validar 

    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: 'El nombre esta vacio'})
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El correo esta vacio'})
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje esta vacio'})
    }

    if(errores.length > 0){
        // consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();
        //mostrar la vista con errores 
        res.render('/testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre, // de este para abajo se envia para que no pierda los datos el usuario si hay un error
            correo,
            mensaje,
            testimoniales
        })
    }else{
        //almacenarlo en la BD 
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje

            });
            res.redirect('/testimoniales')// para redirigir y que se borren los cambios
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}