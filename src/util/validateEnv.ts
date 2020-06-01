import {cleanEnv, str, port} from 'envalid';
import 'dotenv/config';

export const validateEnv = () => {
    cleanEnv(process.env, {
        MONGO_PASSWORD: str(),
        MONGO_USER: str(),
        MONGO_PATH: str(),
        PORT: port()
    });
};