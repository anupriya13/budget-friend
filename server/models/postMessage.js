import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    category: String,
    amount: String,
    shop: String,
    mode: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;