import { response } from "express";
import jwt from "jsonwebtoken";

const validateJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { id, name } = jwt.verify(
            token,
            `${process.env.PRIVATE_KEY}`
        );

        req.id = id;
        req.name = name;

    } catch (error) {
        
        return res.status(400).json({
            msg: 'Token no válido'
        })
    }

    next()
}

export default validateJWT;
