import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import errorHandler from './middlewares/errorHandler';

class App {
   
   public app: express.Application

   constructor(public port: number, controllers)
   {
       this.app = express();

       this.initializeMiddlewares();
       this.initializeController(controllers);
       this.connectToMongo();
       this.initializeErrorHandling();
   }

   private initializeMiddlewares = () => {
        this.app.use(bodyParser.json());
        this.app.use((request: express.Request, response: express.Response, next) => {
            console.log(`${request.method} ${request.path}`);
            next();
        });
   }

   private initializeController = (controllers) => {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
   }

    private async connectToMongo() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
            PORT
        } = process.env;
        
        await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`);
    }

    private initializeErrorHandling() {
        this.app.use(errorHandler);
    }
    
   listen = () => {
       this.app.listen(this.port, () => {
           console.log(`App is listening on port: ${this.port}`);
       });
   }

}

export default App;