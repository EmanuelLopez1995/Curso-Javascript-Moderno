import jwt from 'jsonwebtoken';

const generarJWT = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d", // el tiempo que tarda en expirar el jwt 30 dias
    })
}

export default generarJWT;