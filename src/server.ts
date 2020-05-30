import App from './app';
import PostsController from './controllers/PostsController';
import DefaultController from './controllers/DefaultController';

import 'dotenv/config';
import * as mongoose from 'mongoose';

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
    PORT
} = process.env;

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);



const port: number = parseInt(process.env.PORT) || 4000;
const app = new App(port, [
    new DefaultController(),
    new PostsController()
]);

app.listen();