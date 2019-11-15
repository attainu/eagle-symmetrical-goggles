const SearchController =  {};
const Model = require('./../models/Search.js');

SearchController.search = function(req, res) {
    var term = req.params.term;
    var db = req.app.locals.db;
    Model.search(term, db, function(error, data) {
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
        return res.status(200).json(
			{
				status: true,
				data
            }
        )

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
}

module.exports = SearchController;