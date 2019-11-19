const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

const routeController = require('./routes/routecontroller');
const authRoute = require('./routes/authcontroller');
const db = require('./models/db');

const PORT = 6969;
const app = express();

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:'io2jej9ji9ruri09i3k2po2k394kyE%YE%TYF&^F^E&*U',
    cookie:{
        httpOnly: true,
        maxAge: 30000, //30sec for testing purposes
        path: '/',
        sameSite: true,
        secure: false
    }
}));
//app.use(authRoute.checkIfLoggedIn);
// user will routed to either loginpage or homepage depending upon his session 
app.get('/', routeController.homepage); //this is the homepage of user
app.get('/login', authRoute.sendlogin);
app.get('/signup', authRoute.sendsignup);
app.get('/profile', routeController.sendprofile);
app.get('/aboutus', routeController.sendaboutus);
app.get('/searchquery', routeController.sendsearch);
app.get('/jobsearch', routeController.sendjobsearch);
app.get('/forgotpassword', routeController.sendForgotPassword);

app.post('/setpassword', authRoute.setPassword);
app.post('/forgotpassword', authRoute.forgotPassword);
app.post('/login', authRoute.dologin);
app.post('/signup', authRoute.dosignup);
app.post('/create-job', authRoute.addjob);
//app.post('/profile', routeController.updateprofile);


db.connect()
            .then(function(){
                app.listen(PORT, function(){
                    console.log('shuru hogya');
                }).on('error', function(error){
                    console.log(error);
                });
            })
            .catch(function(error){
                return console.log(error);
            })