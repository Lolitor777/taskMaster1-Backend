import express, { Router } from 'express';
import { consultUserById, createUser, login, logout, renewToken, updatePassword, updateUser, forgotPassword, resetPassword, resetPasswordValidate } from '../controllers/auth.js';
import validateJWT from '../middlewares/validate-jwt.js'

const router = Router();

router.get('/consultarUsuarioPorId/:id', consultUserById);
router.post('/crearUsuario', createUser);
router.post('/login', login );
router.post('/logout', validateJWT, logout);
router.post('/renovarToken', validateJWT, renewToken);
router.put('/actualizarUsuario', updateUser);
router.put('/actualizarContrasenia', updatePassword);

router.post('/recuperarContrasenia', forgotPassword);
router.get('/reset-password/:id/:token', resetPassword);
router.post('/reset-password/:id/:token', resetPasswordValidate);

export default router;