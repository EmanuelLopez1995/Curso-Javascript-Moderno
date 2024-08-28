import mongoose from 'mongoose';

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`mongo db conectado en ${url}`)

    } catch (error) {
        console.log(error.message);
        process.exit(1); // imprime un mensaje de error
    }
}

export default conectarDB;