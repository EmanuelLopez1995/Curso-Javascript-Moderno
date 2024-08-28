import Sequelize from 'sequelize';
import db from '../config/db.js'; // la conexion que creamos

export const Viaje = db.define('viajes', { //viajes es el nombre de la tabla 
    //ponemos todas las columnas y sus propiedades
    titulo: {
        type: Sequelize.STRING
    },
    precio: {
        type: Sequelize.STRING
    },
    fecha_ida: {
        type: Sequelize.DATE
    },
    fecha_VUELTA: {
        type: Sequelize.DATE
    },
    imagen: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    disponibles: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    },
})