require('dotenv').config();
import { AppDataSource } from "./data-source"


AppDataSource.initialize().then(async () => {
    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
