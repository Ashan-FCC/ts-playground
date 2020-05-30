import { Router, Request, Response, NextFunction } from 'express';

class DefaultController {
    

    public router: Router
    constructor(){
        this.router = Router();
        this.initializeDefaultRoute();
    }

    initializeDefaultRoute() {
        this.router.get('/', this.defaultResponse);
    }

    private defaultResponse = (req: Request, res: Response, next: NextFunction) => {
        res.send('Hello from the server side');
    }
}

export default DefaultController;