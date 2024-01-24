import { response } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/user.js";
import generateJWT from '../helpers/jwt.js'
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';


export const consultUserById = async(req, res = response) => {
    
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id
            }
        })

        res.status(200).json({
            user
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al consultar usuario por id'
        })
    }
}


export const createUser = async(req, res = response) => {

    let { name, email, password } = req.body;

    try {    

        const validateEmail = await User.findOne({
            where: {
                email
            }
        })

        if (!validateEmail) {
        //encriptación de contraseña
        const salt = bcrypt.genSaltSync();
        password =  bcrypt.hashSync(password, salt)

        const user = await User.create({ name, email, password });

        //JWT
        const token = await generateJWT( user.id, user.name );

        return res.status(201).json({
            id: user.id,
            msg: 'Registro completado',
            token
            })   
        }

        res.status(200).json({
            ok: false,
            msg: 'El correo electrónico ya se encuentra en uso'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al crear el usuario'
        })
    }
}


export const login = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ 
            where: {
                email
            }
        });

        if ( !user ) {
            return res.status(200).json({
                ok: false,
                msg: 'El correo o contraseña son incorrectos'
            })
        }

        //Confirmar contraseña encriptada
        const validPassword = bcrypt.compareSync( password, user.password)


        if ( !validPassword ) {
            return res.status(400).json({
                mag: 'Contraseña incorrecta'
            });
        }

        //Token
        const token = await generateJWT( user.dataValues.id, user.dataValues.name );

        res.status(200).json({
            user,
            token
        })
        
    } catch (error) {

        console.log(error);
        res.status(400).json({
            msg: 'El correo o contraseña son incorrectos'
        })
    }
}


export const logout = async(req, res = response) => {
    
    try {
      res.status(200).json({
        msg: 'El usuario cerró sesión correctamente'
    })  
    } catch (error) {
        console.log(error);
    }
    
}


export const renewToken = async(req, res = response) => {

    const { id, name } = req;

    const user = await User.findByPk(id)

    if (!user) {
        return res.status(200).json({
            msg: 'El usuario no existe'
        })
    }

    return res.json({
        user,
        msg: 'Token validado'
    })
}

export const updateUser = async(req, res = response) => {
    
    try {
        let { id, name, email } = req.body
        
        const user = await User.findOne({
            where:{
                email
            }
        })

        await User.update({ name, email },
            {
                where: {
                    id
                }
            });
        
        res.status(200).json({
            msg: 'Datos actualizados correctamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al actualizar usuario'
        })
    }
}


export const updatePassword = async(req, res = response) => {
    
    try {
        let { id, password } = req.body
        
        const salt = bcrypt.genSaltSync();
        password =  bcrypt.hashSync(password, salt)

        const user = await User.update({ password },
            {
                where: {
                    id
                }
            });
        
        res.status(200).json({
            msg: 'Contraseña actualizada correctamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al actualizar contraseña'
        })
    }
}


export const forgotPassword = async(req, res = response) => {

    const { email } = req.body

    try {

        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(200).json({
                ok: false,
                msg: `El correo ${email} no existe`
            })
        }

       const secret = process.env.PRIVATE_KEY + user.password;
       
       const token = jwt.sign({
        email: user.email,
        id: user.id
       }, secret, {expiresIn: '5m'})

       const link = `http://localhost:${process.env.PORT}/api/auth/reset-password/${user.id}/${token}`

       var transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
           user: "carvajal57685@gmail.com",
           pass: "yplw fdxu karj jfap",
         },
       });

       var mailOptions = {
         from: "youremail@gmail.com",
         to: user.email,
         subject: "Recupera tu contraseña *TaskMaster*",
         text: link,
       };

       transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
           console.log(error);
         } else {
           console.log("Email enviado: " + info.response);
         }
       });

       res.status(200).json({
        ok: true,
        msg: 'Se ha enviado el enlace al correo electrónico'
       })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al recuperar contrasenia'
        })
    }

}


export const resetPassword = async(req, res = response) => {
    const { id, token } = req.params;

    const user = await User.findOne({
        where: {
            id
        }
    })

    if (!user) {
        return res.status(200).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    }

    const secret = process.env.PRIVATE_KEY + user.password;

    try {
        const verify = jwt.verify(token, secret)
        res.render('index', {
            email: verify.email,
            status: 'No Verificado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error al verificar token'
        })
    }
}


export const resetPasswordValidate = async(req, res = response) => {
    const { id, token } = req.params;
    let { password } = req.body;

    const user = await User.findOne({
        where: {
            id
        }
    })

    if (!user) {
        return res.status(200).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    }

    const secret = process.env.PRIVATE_KEY + user.password;

    try {
        const verify = jwt.verify(token, secret)

        
        const salt = bcrypt.genSaltSync();
        password =  bcrypt.hashSync(password, salt);


        await User.update({ password },
        {
            where: {
                id
            }
        });

        res.render('index', {
            email: verify.email,
            status: 'Verificado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'No se pudo cambiar la contraseña'
        })
    }
}
