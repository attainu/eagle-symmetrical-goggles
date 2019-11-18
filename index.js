const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 9090;
const db = require('./models/index.js');
const controllers = require('./controllers/index.js');

const authRoute = require('./controllers/auth.js');
var session = require('express-session')

//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'))

//session config
app.use(session({
	name: 'Somename',
	secret: 'adfasdfas',
	resave : true,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		maxAge: 1200000,
		path: '/',
		sameSite: true,
		secure: false
	}
}));

// Configure Handlebars
const hbs = exphbs.create({
	extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


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
app.post('/signup/create', controllers.SignupController.create);
app.post('/login', authRoute.login);
app.post('/logout', authRoute.logout);
app.get('/search/posts/:term', controllers.SearchController.postSearch);
app.get('/search/*', controllers.SearchController.search);



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

