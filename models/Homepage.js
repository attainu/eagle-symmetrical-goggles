//importing mongoose
const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema(
    {
        name: String,
        username: String,
        post: String,
        likes: {
            type: Number,
            default: 0
        },
        comments: [{
            user: Object,
            fullname: String,
            username: String,
            comment: String
        }],
        imageUrl: String,
        date: {
            type: Date,
            default: Date.now()
        }
    },
    {
        collection: 'posts'
    }
);

const UserPost = mongoose.model('Post', userSchema);

module.exports = UserPost;