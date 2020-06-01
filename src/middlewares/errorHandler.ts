import {NextFunction, Request, Response} from 'express';
import AppException from '../exceptions/AppException';

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    const status = error instanceof AppException ? error.status : 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message
    });
}

export default errorHandler;