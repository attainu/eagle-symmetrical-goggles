const express = require('express');
const app = express();

const hbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const PORT = 7000;

const routeController = require('./routes/routecontroller');
const authRoute = require('./routes/authcontroller');
const db = require('./models/db');
// Import routes for homepage
const postRoute = require('./routes/homepage.js');


app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// // create application/json parser
// var jsonParser = bodyParser.json();
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

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

//importing multer
const multer = require('multer');
//setting multer to disk storage
const fileStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		//console.log("file",file);
		cb(null, 'public/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({
	storage: fileStorage
});
var cpUpload = upload.fields([
	{ name: 'imagefile', maxCount: 1 },
	{ name: 'videofile', maxCount: 1 },
	{ name: 'pdffile', maxCount: 1 }
]);

//app.use(authRoute.checkIfLoggedIn);
// user will routed to either loginpage or homepage depending upon his session
app.get('/', postRoute.getFeed);
app.get('/login', authRoute.sendlogin);
app.get('/signup', authRoute.sendsignup);
app.get('/profile', routeController.sendprofile);
app.get('/aboutus', routeController.sendaboutus);
app.get('/searchquery', routeController.sendsearch);
app.get('/jobsearch', routeController.sendjobsearch);
app.get('/profile/edit', routeController.sendprofileEdit);
app.get('/forgotpassword', routeController.sendForgotPassword);
app.get('/logout', authRoute.logout);

// For post and image upload 
app.post('/', cpUpload, postRoute.addPost);

// For like an dislike button
// app.post('/:id', postRoute.likedislike);

app.post('/setpassword', authRoute.setPassword);
app.post('/forgotpassword', authRoute.forgotPassword);
app.post('/login', authRoute.dologin);
// app.post('/signup', routeController.dosignup);
app.post('/profile/edit', authRoute.edituser);//checkinggg now..
app.post('/signup', authRoute.dosignup);
app.post('/create-job', authRoute.addjob);
//app.post('/profile', routeController.updateprofile);


// Start the app on pre defined port number on connection with database
db.connect().then( function () {
	app.listen(PORT, function () {
		console.log("Application has started and running on port: ", PORT);
	}).on('error', function (error) {
		console.log("Unable to start app. Error >>>>", error);
	});
}).catch( function (error) {
	console.log("Failed to setup a connection with database",error);
});
