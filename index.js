const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const controllers = require('./controllers/index');
const db = require('./models/index.js');

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

const routeController = require('./routes/routecontroller');
const authRoute = require('./routes/authcontroller');

// user will routed to either loginpage or homepage depending upon his session 
app.get('/', routeController.homepage); //this is the homepage of user
app.get('/login', authRoute.sendlogin);
app.get('/signup', authRoute.sendsignup);
app.get('/profile', routeController.sendprofile);
app.get('/aboutus', routeController.sendaboutus);
app.get('/searchquery', routeController.sendsearch);
app.get('/jobsearch', routeController.sendjobsearch);

app.post('/login', authRoute.dologin);
app.post('/signup', routeController.dosignup);
//app.post('/profile', routeController.updateprofile);


//routes
app.get('/profile', function(req,res) {
	res.render('profile', {title: "Profile"});
})
app.get('/signup', function(req,res) {
	res.render('Signup', {title: "Signup"});
})

app.get('/about', function(req,res) {
	res.render('about', {title: 'About Us'});
});
//app.use(authRoute.checkIfLoggedIn);
//app.post('/signup/create', controllers.SignupController.create);

//app.post('/logout', authRoute.logout);
app.get('/search/posts/:term', controllers.SearchController.postSearch);
app.get('/search/jobs/:term', controllers.SearchController.search);



// Start the app on pre defined port number
db.connect()
.then(function() {
	app.listen(PORT, function() {
		console.log("Application has started and running on port: ", PORT);
	}).on('error', function(error) {
		console.log("Unable to start app. Error >>>>", error);
	});
})
.catch(function(error){
	console.log("Failed to setup connecton with database.", error);
})

