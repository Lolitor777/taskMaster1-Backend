import { response } from "express";
import Priority from "../models/Priority.js";

export const consultPriority = async(req, res = response) => {

    try {
      
        const priority = await Priority.findAll();

        res.status(200).json({
            priority
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo realizar la consulta'
        })
    }

    
}