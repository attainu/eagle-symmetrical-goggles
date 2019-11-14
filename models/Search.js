const Search = {};

Search.search = function(term, db, callback) {
    db.collection('posts').find({"user_id": term}).toArray(function (error, result) {
        if (error){
            return callback(err);
        }
        if (result) {
            return callback(null, result)
        }
    });
}

module.exports = Search;