const LocalStrategy = require('passport-local').Strategy;

function initialize(passport){
    const authenticateUser = async function(username, password, cb){
        const user = getUserBy_username(username)
        if(user == null){
            return cb(null, false, {message: "No such user found"})
        }
        try{
            if (await bcrypt.compare(password, user.password)){
                return cb(null, user)
            }
            else{
                return cb(null, false, { message: "Wrong Password"})
            }
        }
        catch(err){
            return cb(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'username'}), authenticateUser)
    passport.serializeUser(function(user, cb){ })
    passport.deserializeUser(function(id, cb){ })
}
module.exports = authenticateUser;