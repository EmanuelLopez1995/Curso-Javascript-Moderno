import Sequelize from 'sequelize';
import db from '../config/db.js'; // la conexion que creamos

export const Testimonial = db.define('testimoniales', { //testimoniales es el nombre de la tabla 
    //ponemos todas las columnas y sus propiedades
    //poner el ID no es necesario
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.DATE
    }
})