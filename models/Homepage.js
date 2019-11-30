//importing mongoose
const mongoose = require('mongoose');
const moment = require('moment');
const currentTime = moment().format('lll');
console.log("current time>>>",currentTime);

//Schema
const userSchema = new mongoose.Schema(
    [{
        name: String,
        email: String,
        post: String,
        likedBy: [{
            type: Array
        }],
        isLiked: Boolean,
        comments: [{ commentedBy: String, comment: String }],
        imageUrl: String,
        date: { type: Date, default: currentTime }
    }],
    {
        collection: 'posts'
    }
);

const UserPost = mongoose.model('Post', userSchema);

module.exports = UserPost;