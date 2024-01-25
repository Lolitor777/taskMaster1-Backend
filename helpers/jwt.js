import jwt from "jsonwebtoken";


const generateJWT = ( id, name ) => {

    return new Promise(( resolve, reject ) => {

        const payload = { id, name }
        jwt.sign( payload, `${process.env.PRIVATE_KEY}`, {
            expiresIn: '2h'
        }, (err, token) => {

            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token')
            }

            resolve( token );
        })
    })
}

export default generateJWT;