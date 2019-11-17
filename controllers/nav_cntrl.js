

var loggedin = true;
const fetchPage = {}

fetchPage.profile = function(res, cb){
    if(!loggedin){
        return cb("Login First");
    }
    return cb(null, {
        title: 'profile',
        css: 'css/profile.css'
    })
}

fetchPage.aboutus = function(res, cb){
    return cb(null, {
        title: 'about',
        css: 'css/about.css'
    })
}

fetchPage.home = function(res, cb){
    return cb(null, {
        title: 'Sobrad',
        css: 'css/home.css'
    })
}

fetchPage.search = function(req, res, cb){
    return cb(null, {
        title: 'search',
        css: 'css/search.css'
    })
}

fetchPage.jobsearch = function(req, res, cb){
    return cb(null, {
        title: 'search',
        css: 'css/search.css'
    })
}

module.exports = fetchPage;