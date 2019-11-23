//importing mongoose
const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema(
    {
        name: String,
        username: String,
        post: String,
        likes: [{
            likeCount: { type: Number, default: 0 },
            likedBy: { userId: Array }
        }],
        comments: [{
            user: Object,
            username: String,
            comment: String
        }],
        imageUrl: String,
        date: { type: Date, default: Date.now() }
    },
    {
        collection: 'posts'
    }
);

const UserPost = mongoose.model('UserPost', userSchema);

module.exports = UserPost;