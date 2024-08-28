import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from '../helpers/emailRegistro.js';

const registrar = async (req, res) =>{ 

    const { email, nombre } = req.body;

    //revisar si un usuario esta duplicado

    const existeUsuario = await Veterinario.findOne({email}) // podes buscar por los atributos con findOne
    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message}); //salimos de la funcion con el mensaje de error
    }
    try {
        //Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body); // esto crea un nuevo objeto de veterinarios (viene del modelo la "clase")
        const veterinarioGuardado = await veterinario.save(); // para guardar en la base de datos
        
        //Enviar Email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });
        
        res.json(veterinarioGuardado); // esto es lo que va a traer de respuesta
    } catch (error) {
        console.log(error);
    }
}

const perfil = (req, res) =>{ 
    const { veterinario } = req;
    res.json({perfil: veterinario})
}

const confirmar = async (req, res) =>{
    const {token} = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token}); // buscamos en la BD por token
    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message}); // si el token que se envia por la url no encuentra el token en la DB
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save(); // aca guardamos los cambios en la DB
        res.json({msg: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req,res) => {
    const {email, password} = req.body;

    //comprobar si el usuario existe 
    const usuario = await Veterinario.findOne({email}) 
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(403).json({msg: error.message}); //salimos de la funcion con el mensaje de error
    }

    //Confirmar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada")
        return res.status(403).json({msg: error.message})
    }

    //Revisar el password
    if(await usuario.comprobarPassword(password)){
        //Autenticar
        res.json({token: generarJWT(usuario.id)})
    }else{
        const error = new Error("El password es incorrecto")
        return res.status(403).json({msg: error.message})
    }
}

const olvidePassword = async (req,res) =>{
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({email});
    if(!existeVeterinario){
        const error = new Error("El ususario no existe");
        return res.status(400).json({msg: error.message})
    }  

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({msg: "Hemos enviado un mail con las instrucciones"});
    } catch (error) {
        console.log(error)
    }
};

const comprobarToken  = async (req,res) =>{
    const {token} = req.params ; // para sacar el token de la url

    const tokenValido = await Veterinario.findOne({ token }); // busca en la bd si hay un token como ese

    if(tokenValido){
        //El token es valido el usuario existe
        res.json({msg: "Token valido y el usuario existe"});
    }else{
        const error = new Error('Token no valido');
        return res.status(400).json({msg: error.message});
    }
};

const nuevoPassword = async (req,res) =>{
    const {token} = req.params;
    const { password } = req.body;

    const veterinario = await Veterinario.findOne({token});

    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: "Password modificado correctamente"});
    } catch (error) {
        console.log(error);
    }
};



export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}