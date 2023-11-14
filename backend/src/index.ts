require('dotenv').config();
import { AppDataSource } from "./data-source"
import * as express from 'express'
import categoryRoute from './routes/categoryRoute'

const app = express()
app.use(express.json())
app.use('/api', categoryRoute)
AppDataSource.initialize().then(async () => {
    app.listen(80, ()=> console.log('app is running'))

}).catch(error => console.log(error))
