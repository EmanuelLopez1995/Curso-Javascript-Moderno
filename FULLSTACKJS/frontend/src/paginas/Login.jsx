import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Inicia sesion y administra tus {''} <span className="text-black"> pacientes </span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            <form action="">
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input 
                        type="text" 
                        placeholder="Email de registro"
                        className="border w-full padding-3 mt-3 bg-gray-50 rounded-xl"
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Password
                    </label>
                    <input 
                        type="email" 
                        placeholder="Tu password"
                        className="border w-full padding-3 mt-3 bg-gray-50 rounded-xl"
                    />
                </div>
                <input type="submit" 
                    value="Iniciar sesion"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto"
                />
            </form>
            
            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link to="/registrar" className='block text-center my-5 text-gray-500'>No tienes una cuenta? registrate</Link>
                <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi password</Link>
            </nav>
        </div>
    </>
  )
}

export default Login