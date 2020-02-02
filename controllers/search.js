const SearchController =  {};
const Signup = require('../models/Users.js');

SearchController.search = function(req, res) {
    var term = req.query.term;
    var userEmail = req.session.user; //need this to show follow/unfollow button
    // console.log(term);
    Signup.find({"firstname": term}, function(error, data) {
        if(error){
            res.send({
                status: false,
                message: error
            })
        }
        // var check = (data.followers).includes(userEmail);
        // console.log(check);
        res.render('search',{
            term,
            data,
            userEmail: userEmail
        })
    })
}

module.exports = SearchController;