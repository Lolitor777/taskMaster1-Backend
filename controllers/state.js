import { response } from "express";
import State from "../models/State.js";

export const consultState = async(req, res = response) => {

    try {
        const state = await State.findAll();

        res.status(200).json({
            state
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al consultar el estado'
        })
    }
}