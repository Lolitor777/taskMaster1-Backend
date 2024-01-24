import { DataTypes } from "sequelize";
import db from "../database/db.js";

const State = db.define('tb_state', {
    description: {
        type: DataTypes.STRING
    }
})

export default State;