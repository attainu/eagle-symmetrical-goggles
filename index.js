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
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'))
// app.use("static",express.static("public"));


//session config
app.use(session({
	name: 'Somename',
	secret: 'adfasdfas',
	resave : false,
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
app.get('/login', function(req, res) {
	res.render('login',{layout: false});
});
app.get('/profile', function(req,res) {
	res.render('profile', {title: "Profile"});
})
app.get('/signup', function(req,res) {
	res.render('Signup', {title: "Signup", css_file_ref: 'css/signup.css'});
});

app.get('/about', function(req,res) {
	res.render('about', {title: 'About Us', css_file_ref: 'css/about.css'});
});
app.get('/search/jobs', function(req,res) {
	res.render('Jobsearch', {title: "Search"});
})
app.get('/forgotpassword', function(req, res) {
	res.render('forgot', {title: "Forgot Password?"})
});

app.get('/jobsearch', controllers.JobSearchController.retrievejob);

app.get('/profile-edit',controllers.ProfileEditController.showInfo);

// app.use(authRoute.checkIfLoggedIn);
app.post('/signup/create', controllers.SignupController.create);
app.post('/login', authRoute.login);
app.get('/logout', authRoute.logout);
app.get('/search/*', controllers.SearchController.search);
app.post('/setpassword', controllers.ForgotPasswordController.setPassword);
app.post('/forgotpassword', controllers.ForgotPasswordController.findUser);
app.post('/profile-edit', controllers.ProfileEditController.edituser);
app.post('/jobsearch', controllers.JobSearchController.createnewjob);


//These routes are to be handled
//app.post('/create-job', authRoute.addjob);


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

