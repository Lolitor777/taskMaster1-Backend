import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Priority = db.define('tb_priorities', {
    description: {
        type: DataTypes.STRING
    }
})

export default Priority;