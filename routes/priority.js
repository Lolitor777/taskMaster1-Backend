import express from 'express';
import { consultPriority } from '../controllers/priority.js';

const router = express.Router();

router.get('/consultarPrioridad', consultPriority);

export default router;