import Post from '../interfaces/Post';
import postsModel from '../models/Posts';

class PostsRepository {
    constructor(){

    }

    async createAPost(postData: Post): Promise<Post> {
        const post = new postsModel(postData);
        const createdPost = await post.save();
        return createdPost.toObject() as Post;
    }
}

export default PostsRepository;