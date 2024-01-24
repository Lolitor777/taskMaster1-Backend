import {Sequelize} from 'sequelize';

const db = new Sequelize('taskmaster', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;