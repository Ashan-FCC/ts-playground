import express from 'express';
import * as bodyParser from 'body-parser';

class App {
   public app: express.Application

   constructor(public port: number, controllers)
   {
       this.app = express();

       this.initializeMiddlewares();
       this.initializeController(controllers);
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

   listen = () => {
       this.app.listen(this.port, () => {
           console.log(`App is listening on port: ${this.port}`);
       });
   }

}

export default App;