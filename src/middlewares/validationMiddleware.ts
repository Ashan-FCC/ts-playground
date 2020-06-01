import express, {Request, Response, NextFunction} from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import AppException from '../exceptions/AppException';
import HttpStatus from 'http-status-codes';

function validationMiddleware<T>(type: any, skipMissingProperties = false) : express.RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const errors: ValidationError[] = await validate(plainToClass(type, req.body), { skipMissingProperties});
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            next(new AppException(HttpStatus.BAD_REQUEST, message));
        } 
        next();
    };
}

export default validationMiddleware;