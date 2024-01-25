import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import taskRoutes from './routes/task.js'
import authRoutes from './routes/auth.js'
import priorityRoutes from './routes/priority.js'
import stateRoutes from './routes/state.js'
import './config.js'
import { PORT } from './config.js'

const app = express();
app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))


app.use( cors() )
app.use(express.json())

app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/priority', priorityRoutes);
app.use('/api/state', stateRoutes)

try {
    db.authenticate()
    console.log('Conexión exitosa a la base de datos');
} catch (error) {
    console.log('Error al conectar con base de datos', error);
}

app.listen(PORT, () => {
    console.log(`Server online in port ${PORT}`);
})
