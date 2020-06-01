import { Request, Response, Router, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import PostsRepository from '../repositories/PostsRepository';
import IController from '../interfaces/IController';
import PostNotFoundException from '../exceptions/PostNotFoundException';

class PostsController implements IController {
    public path = '/posts'
    public router = Router()
    private postsRepo = new PostsRepository();

    constructor()
    {
        this.initializeRoutes();
    }

    private initializeRoutes = () => {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostsById);
        this.router.patch(`${this.path}/:id`, this.updatePost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
        this.router.post(this.path, this.validate, this.createAPost);
    }

    private getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const posts = await this.postsRepo.getAll();
        return res.status(HttpStatus.OK).send(posts);
    }

    private createAPost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const {author, content, title}  = req.body;
        const createdPost = await this.postsRepo.createAPost({author, content, title});
        return res.status(HttpStatus.CREATED).send(createdPost);
    }

    private getPostsById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const postId = req.params.id;
        try {
            const post = await this.postsRepo.getSingle(postId);
            return res.status(HttpStatus.OK).send(post);
        } catch(e)   {
            next(new PostNotFoundException(postId));
        }
    }

    private updatePost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const id = req.params.id;
        try {
            const post = await this.postsRepo.updatePost(id, req.body, true);
            return res.status(HttpStatus.OK).send(post);
        } catch (e) {
            next(new PostNotFoundException(id));
        }
    }

    private deletePost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const id = req.params.id;
        try {
            await this.postsRepo.deletePost(id);
            return res.status(HttpStatus.OK).send();
        } catch(e) {
            next(new PostNotFoundException(id));
        }
    }

    private validate = (req: Request, res: Response, next: NextFunction) => {
        const {author, content, title} = req.body;
        if(author && content && title){
            return next();
        }
        res.status(HttpStatus.BAD_REQUEST).send('Invalid body');
    }

}

export default PostsController;