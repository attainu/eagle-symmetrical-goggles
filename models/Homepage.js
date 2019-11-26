//importing mongoose
const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema(
    [{
        name: String,
        email: String,
        post: String,
        likes: {
            likeCount: { type: Number, default: 0 },
            likedBy: Array
        },
        comments: [ { commentedBy: String, comment: String } ],
        imageUrl: String,
        date: { type: Date, default: Date.now() }
    }],
    {
        collection: 'posts'
    }
);

const UserPost = mongoose.model('Post', userSchema);

module.exports = UserPost;