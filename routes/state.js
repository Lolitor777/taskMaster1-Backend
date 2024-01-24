import express from 'express';
import { consultState } from '../controllers/state.js';

const router = express.Router();

router.get('/consultarEstado', consultState);

export default router;