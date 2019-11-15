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
Search.jobSearch = function(term, db, callback) {
    db.collection('jobs').find({"domain": term}).toArray(function (error, result) {
        if (error){
            return callback(err);
        }
        if (result) {
            return callback(null, result)
        }
    });
}

Search.userSearch = function(term, db, callback) {
    db.collection('profiles').find({"firstname": term}).toArray(function (error, result) {
        if (error){
            return callback(err);
        }
        if (result) {
            return callback(null, result)
        }
    })
}
module.exports = Search;