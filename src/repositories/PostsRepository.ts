import Post from '../interfaces/Post';
import postsModel from '../models/Posts';
import IPostsRepository from '../interfaces/IRestRepository';

class PostsRepository implements IPostsRepository {
    constructor(){

    }
    
    async getSingle(id: string): Promise<Post> {
        const post = await postsModel.findById(id);
        return ({
            author: post.author,
            content: post.content,
            title: post.title
        } as Post);
    }

    async getAll(): Promise<Post[]> {
        
        const posts = await postsModel.find();
        return posts.map(p => {
            return ({
                author: p.author,
                content: p.content,
                title: p.title
            } as Post);
        });
    }

    async updatePost(id: string, postBody: Post, returnNew: boolean = false): Promise<Post>{
        return await postsModel.findByIdAndUpdate(id, postBody, {new: returnNew});
    }

    async deletePost(id: string): Promise<boolean> {
        try {
            await postsModel.findByIdAndDelete(id);
        } catch (e){
            return false;
        }
        return true;
    }

    async createAPost(postData: Post): Promise<Post> {
        const post = new postsModel(postData);
        const createdPost = await post.save();
        return createdPost.toObject() as Post;
    }
}

export default PostsRepository;