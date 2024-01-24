import { request, response } from 'express';
import Task from '../models/Task.js';
import Priority from '../models/Priority.js';
import State from '../models/State.js';
import User from '../models/user.js';


export const consultAllTask = async(req, res = response) => {

    try {
        const task = await Task.findAll({
            attributes: ['id', 'description', 'due_date'],
            include: [{
                model: Priority,
                attributes: ['description']
            },{
                model: State,
                attributes: ['description']
            },{
                model: User,
                attributes: ['name']
            }],
            where: {
                id_user: req.params.id
            }
        })


        res.status(200).json({
            task
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al consultar las tareas'
        })
    }
}

export const consultTaskById = async (req, res = response) => {

    try {
        const task = await Task.findAll({
            include: [{
                model: Priority,
                attributes: ['description']
            },{
                model: State,
                attributes: ['description']
            }],
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            task
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: `La tarea con el id ${id} no existe` 
        })
    } 
}

export const consultPendingTask = async ( req, res = response ) => {

    try {

        const task = await Task.findAll({
            attributes: ['id', 'description', 'due_date'],
            include: [{
                model: Priority,
                attributes: ['description']
            },{
                model: State,
                attributes: ['description']
            },{
                model: User,
                attributes: ['name']
            }],
            where: {
                id_state: 1,
                id_user: req.params.id   
            }
        })

        if (task.length < 1) {
            return res.status(304).json({
                task,
                msg: 'No hay tareas pendientes'
            })
        }

        res.status(200).json({
            task
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al consultar tareas pendientes'
        })
    }
}

export const consultTaskInProgress = async ( req, res = response ) => {

try {

    const task = await Task.findAll({
        attributes: ['id', 'description', 'due_date'],
        include: [{
            model: Priority,
            attributes: ['description']
        },{
            model: State,
            attributes: ['description']
        },{
            model: User,
            attributes: ['name']
        }],
        where: {
            id_state: 2,
            id_user: req.params.id
        }
    })

    if (task.length < 1) {
            return res.status(201).json({
                task,
                msg: 'No hay tareas en progreso'
            })
        }

    res.status(200).json({
        task
    })
    
} catch (error) {
    console.log(error);
    res.status(400).json({
        msg: 'Error al consultar tareas en progreso'
    })
}
}

export const consultCompleteTask = async ( req, res = response ) => {

try {

    const task = await Task.findAll({
        attributes: ['id', 'description', 'due_date'],
        include: [{
            model: Priority,
            attributes: ['description']
        },{
            model: State,
            attributes: ['description']
        },{
            model: User,
            attributes: ['name']
        }],
        where: {
            id_state: 3,
            id_user: req.params.id
        }
    })

    if (task.length < 1) {
        return res.status(200).json({
            task,
            msg: 'No hay tareas completadas'
        })
    }
    
    res.status(200).json({
        task
    })
    

} catch (error) {
    console.log(error);
    res.status(400).json({
        msg: 'Error al consultar tareas completadas'
    })
}
}

export const createTask = async(req, res = response) => {
    try {
        const { description, 
                due_date, 
                id_priority, 
                id_state,
                id_user } = req.body;

        const task = await Task.create({
            description,
            due_date,
            id_priority,
            id_state,
            id_user
        })

        res.status(200).json({
            msg: 'Tarea creada con éxito'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al crear la tarea'
        })
    }
}

export const updateTask = async(req, res = response) => {
    try {
        const {    
                description, 
                due_date, 
                id_priority, 
                id_state,
                 } = req.body;

        const task = await Task.update({
            description,
            due_date,
            id_priority,
            id_state,
        }, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            msg: 'Se actualizó la tarea correctamente'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al actualizar tarea'
        })
    }
}

export const deleteTask = async(req, res = response) => {
    try {
        
        const { id } = req.params;

        const task = await Task.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            msg: 'Tarea eliminada'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al eliminar la tarea'
        })
    }
}