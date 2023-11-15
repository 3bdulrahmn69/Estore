require('dotenv').config();
import { AppDataSource } from "./data-source"
import * as express from 'express'
import categoryRoute from './routes/categoryRoute'
import productRotute from './routes/productRoute'
import * as cors from 'cors';


const app = express()
app.use(express.json())
app.use(cors());
app.use('/api', categoryRoute)
app.use('/api', productRotute)
AppDataSource.initialize().then(async () => {
    app.listen(3000, ()=> console.log('app is running'))

}).catch(error => console.log(error))
