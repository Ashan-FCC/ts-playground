import App from './app';
import PostsController from './controllers/PostsController';
import DefaultController from './controllers/DefaultController';
import { validateEnv } from './util/validateEnv';

validateEnv();
const port: number = parseInt(process.env.PORT) || 4000;
const app = new App(port, [
    new DefaultController(),
    new PostsController()
]);

app.listen();