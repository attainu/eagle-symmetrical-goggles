const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

// Import routes
const postRoute = require('./routes/feedpage.js');

const routeController = require('./routes/routecontroller');
const authRoute = require('./routes/authcontroller');
const db = require('./models/db');

const PORT = 6969;
const app = express();

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

//importing multer
const multer = require('multer');
//setting multer to disk storage
const fileStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({
	storage: fileStorage
});
// Setting fields for  upload using multer
var cpUpload = upload.fields([
	{ name: 'imageFile', maxCount: 1 },
	{ name: 'videoFile', maxCount: 1 },
	{ name: 'pdfFile', maxCount: 1 }
]);
// app.use('/public',express.static('public'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: 'io2jej9ji9ruri09i3k2po2k394kyE%YE%TYF&^F^E&*U',
    cookie: {
        httpOnly: true,
        maxAge: 30000, //30sec for testing purposes
        path: '/',
        sameSite: true,
        secure: false
    }
}));

// user will routed to either loginpage or homepage depending upon his session 
app.get('/', routeController.homepage); //this is the homepage of user
app.get('/login', authRoute.sendlogin);
app.get('/signup', authRoute.sendsignup);
app.get('/profile', routeController.sendprofile);
app.get('/aboutus', routeController.sendaboutus);
app.get('/searchquery', routeController.sendsearch);
app.get('/jobsearch', routeController.sendjobsearch);

//
app.get('/feed', postRoute.getFeed);
app.post('/feed', postRoute.addPost);

app.post('/login', authRoute.dologin);
app.post('/signup', authRoute.dosignup);
app.post('/create-job', authRoute.addjob);
//app.post('/profile', routeController.updateprofile);


db.connect()
    .then(function () {
        app.listen(PORT, function () {
            console.log('shuru hogya');
        }).on('error', function (error) {
            console.log(error);
        });
    })
    .catch(function (error) {
        return console.log(error);
    })