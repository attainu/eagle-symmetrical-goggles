const mongoose = require('mongoose');

const postSchema = new Schema({
	body  : {type:String,trim:true},
	image : {type:String,trim:true},
	likes : Array,
	comments : [{
				 user : Object,
				 fullname : String,
				 username : String,
				 comment : String
			   }],
	date   : {type:Date,default:Date.now()},
	owner  : Object
}, {
    collection: 'posts'
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;