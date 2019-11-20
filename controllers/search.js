const SearchController =  {};
const Signup = require('./../models/Signup.js');

SearchController.search = function(req, res) {
    var term = req.query.term;
    Signup.find({"firstname": term}, function(error, data) {
        if(error){
            res.send({
                status: false,
                message: error
            })
        }
        res.render('search',{
            term,
            data
        })
    })
}    

module.exports = SearchController;