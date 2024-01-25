import { DataTypes } from "sequelize";
import db from "../database/db.js";
import Priority from './Priority.js'
import State from './State.js'
import User from "./User.js";


const Task = db.define('tb_task', {
    description: {
        type: DataTypes.STRING
    },
    due_date: {
        type: DataTypes.DATE
    },
    id_priority: {
        type: DataTypes.BIGINT
    },
    id_state: {
        type: DataTypes.BIGINT
    },
    id_user: {
        type: DataTypes.BIGINT
    },
})

Task.belongsTo(Priority, {
    foreignKey: "id_priority"
})

Task.belongsTo(State, {
    foreignKey: "id_state"
})

Task.belongsTo(User, {
    foreignKey: "id_user"
})

export default Task;