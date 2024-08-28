import  express  from 'express';
import router from './routes/index.js';
import db from './config/db.js';


const app = express(); // funcion para ejecutar express

//conectar base de datos
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//Definir puerto 

const port = process.env.PORT || 4000; //la primera variable en local no va a existir, va a tomar el segundo 
//una vez que se hace el deployment esa variable de arriba si va a existir

//habilitar pug
app.set('view engine', 'pug');

//obtener el año actual
app.use( (req, res, next)=> { // req lo que se envia al servidor, res lo que responde, next para pasar al siguiente middleware
    const year = new Date();
    res.locals.actualYear = year.getFullYear(); // la variable actualYear la vamos a poder usar en cualquier lado
    res.locals.nombreSitio = "Agencia de viajes";
    return next();
})

//Agregar body parser para leer los datos del form
app.use(express.urlencoded({extended: true}))

//definir la carpeta publica
app.use(express.static('public'));

//agregar router
app.use('/', router) // soporta get, post, put, patch y delete, lo que hace es que desde la pagina principal, agrega router y las rutas que estan dentro

app.listen(port, ()=>{ // arranca el servidor
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})