const FeedController = {};
const FeedModel = require('./../models/Feedpage.js');


FeedController.getFeed = function (req, res) {
    FeedModel.find( {}, function (error, data) {
        if (error) {
            res.status(500).send({
                status: false,
                message: error
            });
        }
        console.log(data);
        return res.render('feedPage.handlebars', {
            status: true,
            userData: data.reverse()
        });
    });
};

FeedController.addPost = function (req, res) {
    var userData = req.body;
    console.log("POST>>", userData);

    var newPost = FeedModel(
        {
            name: userData.userName,
            post: userData.post,
            date: userData.time
        }).save(
        function (error, data) {
            if (error) {
                return res.status(500).send({
                    status: false,
                    message: "FAiled to create User"
                });
            }
            return res.json(data);
        });
};

FeedController.postFiles = function (req, res) {
    var imageUrl = req.files['imageFile'][0].path;
    console.log("url", imageUrl);
    console.log(req.files['imageFile'][0]);

    return res.render('feedPage', {
        data: imageUrl,
        status: true,
        message: "Media posted successfully!",
        postime: moment().format('LLLL')
    });
}

module.exports = FeedController;