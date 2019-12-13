const User = require('../models/Users.js');

const FollowController =  {};

//new follow option
FollowController.followUnfollow = (req, res) => {
    var followId = req.body.email;
    var myId = req.session.user;

    User.findOne({email: myId},(error, result) => {
        if(error){
            return console.log(error)
        }
        if(result.following===null || (result.following).includes(followId)===false){
            User.findOneAndUpdate({email: myId}, { $push: { following: followId } }, {useFindAndModify: false}, (error, result) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json({ error: error });
                }
                console.log("addFollowing works");
            });
            User.findOneAndUpdate({email: followId}, { $push: { followers: myId } }, {useFindAndModify: false}, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                }
                console.log("addFollower works");
                return res.send(true);
            });
        }

        if((result.following).includes(followId)===true){
            User.findOneAndUpdate({email: myId}, { $pull: { following: followId } }, {useFindAndModify: false}, (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err });
                }
                console.log("removeFollowing works");
            });
            User.findOneAndUpdate({email: followId}, { $pull: { followers: myId } }, {useFindAndModify: false}, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                }
                console.log("removeFollower works");
                return res.send(false);
            });
        }
    });
};

module.exports = FollowController;
