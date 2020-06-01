import { Request, Response, Router, NextFunction } from 'express';
import { HTTP_CREATED, BAD_REQUEST } from '../statusCodes';
import Post from '../interfaces/Post';
import PostsRepository from '../repositories/Posts';

class PostsController {
    private path = '/posts'
    public router = Router()
    private posts: Post[] = [
        {
            author: 'Marcin',
            content: 'Dolor sit amet',
            title: 'Lorem Ipsum',
        }
    ];
    private postsRepo = new PostsRepository();

    constructor()
    {
        this.initializeRoutes();
    }

    private initializeRoutes = () => {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.validate, this.createAPost);
    }

    getAllPosts = (req: Request, res: Response, next: NextFunction) => {
        res.send(this.posts);
    }

    async createAPost(req: Request, res: Response, next: NextFunction) {
        const {author, content, title}  = req.body;
        this.posts.push({author, content, title});
        const createdPost = await this.postsRepo.createAPost({author, content, title});
        res.send(createdPost).status(HTTP_CREATED);
    }

    validate = (req: Request, res: Response, next: NextFunction) => {
        const {author, content, title} = req.body;
        if(author && content && title){
            next();
        }
        res.send('Invalid body').status(BAD_REQUEST);
    }

}

export default PostsController;