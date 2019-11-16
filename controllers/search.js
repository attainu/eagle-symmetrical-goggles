const SearchController =  {};
const jobController = require('./../models/Jobs.js');
const postController = require('./../models/Post.js');

SearchController.search = function(req, res) {
    var term = req.params.term;
    jobController.find({"domain": term}, function(error, data) {
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
SearchController.postSearch = function(req, res) {
    var term = req.params.term;
    postController.find({"firstname": term}, function(error, data) {
        if(error){
            res.send({
                status: false,
                message: error
            })
        }
        console.log(data);
        res.render('search',{
            term,
            data
        })
    })
}    

module.exports = SearchController;