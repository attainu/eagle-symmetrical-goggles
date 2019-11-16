const SearchController =  {};
const jobController = require('./../models/Jobs.js');

SearchController.search = function(req, res) {
    var term = req.params.term;
    jobController.find({"domain": term}, function(error, result) {
        if(error){
            res.send({
                status: false,
                message: error
            })
        }
        res.send({
            status:true,
            data: result
        })
    })
}    
    
    
    
/*     
    (term, db, function(error, data) {
        if(error) {
			return res.status(500).json(
				{
					status: false,
					error
				}
			);
        }
        return res.status(200).json(
			{
				status: true,
				data
            }
        )

    })
}

SearchController.jobSearch = function(req, res) {
    var term = req.params.term;
    var db = req.app.locals.db;
    Model.jobSearch(term, db, function(error, data) {
        if(error) {
			return res.status(500).json(
				{
					status: false,
					error
				}
			);
        }
        /* return res.status(200).json(
			{
				status: true,
				data
            }
        ) */
           /* return res.render('search', {
                term,
                data
            })
    })
}
SearchController.userSearch = function(req, res) {
    var term = req.params.term;
    var db = req.app.locals.db;
    Model.userSearch(term, db, function(error, data) {
        if(error) {
			return res.status(500).json(
				{
					status: false,
					error
				}
            );    
        }
        return res.status(200).json(
			{
				status: true,
				data
            }
        )

    })
} */

module.exports = SearchController;