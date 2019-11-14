const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 9090;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
const authRoute = require('./controllers/auth.js');
const searchRoute = require('./controllers/search.js');
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

//mongodb setup 
MongoClient.connect(url, function(error, client) {
	if(error){
		throw error;
	}
	app.locals.db = client.db('whitecollardb');
	console.log("Connection successfull");
});

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
app.use(authRoute.checkIfLoggedIn);
app.post('/login', authRoute.login);
app.post('/logout', authRoute.logout);
app.get('/search/:term', searchRoute.search);



// Start the app on pre defined port number
app.listen(PORT, function() {
	console.log("Application has started and running on port: ", PORT);
}).on('error', function(error) {
	console.log("Unable to start app. Error >>>>", error);
});