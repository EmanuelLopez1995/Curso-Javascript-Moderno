import {Link} from 'react-router-dom';
import { useState} from 'react'
import Alerta from '../components/alerta';
import axios from 'axios';

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e =>{
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({msg: 'Hay campos vacios', error: 'true'})
            return;
        }
        if(password != repetirPassword){
            setAlerta({msg: 'Los passwords no son iguales', error: 'true'})
            return;
        }

        if(password.length < 6){
            setAlerta({msg: 'el password esmuy corto, minimo 6 caracteres', error: 'true'})
            return;
        }
        
        setAlerta({});

        //Crear el usuario en la API

        try {
            const url = "http://localhost:4000/api/veterinarios";
            await axios.post(url, {nombre, email, password});
            setAlerta({
                msg: 'Creado correctamente',
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true,
            })
        }
    }

    const {msg} = alerta;



    return (
      <>  
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y administra tus pacientes {''} <span className="text-black"> pacientes </span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta 
                    alerta={alerta}
                />
                }
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            placeholder="Tu nombre"
                            className="border w-full padding-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="Email de registro"
                            className="border w-full padding-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Tu password"
                            className="border w-full padding-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir tu password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Repite tu password"
                            className="border w-full padding-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" 
                        value="Crear cuenta"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto"
                    />
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link to="/" className='block text-center my-5 text-gray-500'>Ya tienes una cuenta? inicia sesion</Link>
                    <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi password</Link>
                </nav>
            </div>
      </>
    )
  }
  
  export default Registrar