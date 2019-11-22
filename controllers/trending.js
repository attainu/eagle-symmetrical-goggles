const Posts = require('./../models/Homepage.js');
const TrendingController = {};


TrendingController.getTrending = function(req, res) {
    Posts.find({}).sort({ likes: 'desc' }).exec(function(error, posts) {
        if (error) {
            console.log(error);
            res.status(500).send({
                status: false,
                message: error
            });
        }

        return res.render('trending', {
            posts
        });
    });
}

module.exports = TrendingController;