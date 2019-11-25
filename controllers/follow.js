const User = require('../models/Users.js');

const FollowController =  {};

// follow unfollow
FollowController.addFollowing = (req, res, next) => {
    var followId = req.body.email;
    var myId = req.session.user;
    User.findOneAndUpdate({email: myId}, { $push: { following: followId } }, {useFindAndModify: false}, (error, result) => {
        if (error) {
            console.log(error)
            return res.status(400).json({ error: error });
        }
        console.log("addFollowing works");
        next();
    });
};

FollowController.addFollower = (req, res) => {
    var followId = req.body.email;
    console.log(followId);

    var myId = req.session.user;
    User.findOneAndUpdate({email: followId}, { $push: { followers: myId } }, {useFindAndModify: false}, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        console.log("addFollower works");
        res.json(result);
    });
};

// remove follow unfollow
FollowController.removeFollowing = (req, res, next) => {
    var unfollowId = req.body.email;
    var myId = req.session.user;
    User.findOneAndUpdate({email: myId}, { $pull: { following: unfollowId } }, {useFindAndModify: false}, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        console.log("removeFollowing works");
        next();
    });
};

FollowController.removeFollower = (req, res) => {
    var unfollowId = req.body.email;
    var myId = req.session.user;
    User.findOneAndUpdate({email: unfollowId}, { $pull: { followers: myId } }, {useFindAndModify: false}, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        console.log("removeFollower works");
        res.json(result);
    });
};

module.exports = FollowController;
