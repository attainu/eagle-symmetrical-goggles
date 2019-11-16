

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

module.exports = fetchPage;