import Post from './Post';

interface IPostsRepository {
    getSingle(author: string): Promise<Post>;
    getAll(): Promise<Post[]>;
    createAPost(postData: Post): Promise<Post>;
    updatePost(id: string, postData: Post, returnNewPost: boolean): Promise<Post>;
    deletePost(id: string): Promise<boolean>;
}

export default IPostsRepository;