require('dotenv').config();
import { AppDataSource } from "./data-source"
import * as express from 'express'
import categoryRoute from './routes/categoryRoute'
import productRotute from './routes/productRoute'
import * as cors from 'cors';
import AppError from './utils/appError'
import handleErrors = require('./controllers/errorController')


const app = express()
app.use(express.json())
app.use(cors());
app.use('/api', categoryRoute)
app.use('/api', productRotute)

app.all('*', (req, res, next) => {
    // const err: any= new Error(`Cant't find ${req.originalUrl} on server`);
    // err.status = 'fail'
    // err.statusCode = 404;
    next(new AppError(`Cant't find ${req.originalUrl} on server`, 404))
})

app.use(handleErrors)

AppDataSource.initialize().then(async () => {
    app.listen(3000, ()=> console.log('app is running'))

}).catch(error => console.log(error))
