import mongoose from 'mongoose';
import Post from '../interfaces/Post';

const postsSchema = new mongoose.Schema({
    author: String,
    content: String,
    title: String
});

const postModel = mongoose.model<Post & mongoose.Document>('Post', postsSchema);

export default postModel;