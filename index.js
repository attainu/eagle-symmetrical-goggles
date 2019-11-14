const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 9090;
const moment = require('moment');

//importing multer
const multer = require('multer');

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use('/public', express.static('public'));

// Configure Handlebars
const hbs = exphbs.create({
	extname: '.hbs'
});

//setting view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');



//setting multer
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

//importing Feed controller
var feedController = require('./controllers/feedpage.js');


app.get('/', function (req, res) {
	res.render('home');
});

app.get('/feed', feedController.getFeed);

var cpUpload = upload.fields([
	{ name: 'imageFile', maxCount: 1 },
	{ name: 'videoFile', maxCount: 1 },
	{ name: 'pdfFile', maxCount: 1 }
]);

app.post('/myPost', upload.none(), feedController.postStatus);
app.post('/uploadFiles', cpUpload, feedController.postFiles);

// Start the app on pre defined port number
app.listen(PORT, function () {
	console.log("Application has started and running on port: ", PORT);
}).on('error', function (error) {
	console.log("Unable to start app. Error >>>>", error);
});