import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from "bcrypt";

//esto crea el esquema y es la forma que van a tener los datos
const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: String,
        default: null, // le ponemos un default porque no es obligatorio(required)
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
})

veterinarioSchema.pre('save', async function(next) { // aca no hay que usar arrow function
    //el this va a tener todos los datos del objeto que se va a guardar
    if(!this.isModified('password')){ // esto es para saber si un password ya esta hasheado que lo ignore
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    //retorna true o false
    // passwordFormulario es el que ingresa en el form, this.password el que esta en la base
    return await bcrypt.compare(passwordFormulario, this.password) // compare compara lo que se manda con lo de la base, aunque este hasheado 
}

const Veterinario = mongoose.model('Veterinario', veterinarioSchema); // esto lo registra como modelo, primer parametro nombre del modelo(creo), se recomienda usar el mismo que la variable y el segundo el nombre del esquema de arriba

export default Veterinario;