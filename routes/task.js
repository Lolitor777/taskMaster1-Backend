import express from 'express';
import { 
    consultAllTask, 
    consultTaskById, 
    createTask, 
    deleteTask, 
    updateTask, 
    consultPendingTask,
    consultTaskInProgress,
    consultCompleteTask } from '../controllers/task.js';

const router = express.Router();

router.get('/consultarTarea/:id', consultAllTask);
router.get('/consultarTareaPorId/:id', consultTaskById )
//Filtros
router.get('/tareaPendiente/:id', consultPendingTask)
router.get('/tareaEnProgreso/:id', consultTaskInProgress)
router.get('/tareaCompletada/:id', consultCompleteTask)

router.post('/guardarTarea', createTask);
router.put('/actualizarTarea/:id', updateTask);
router.delete('/eliminarTarea/:id', deleteTask);

export default router;