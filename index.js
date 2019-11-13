const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 9090;
const moment = require('moment');
app.use(express.json());
app.use(express.urlencoded());

app.use('/static', express.static('public'));

// Configure Handlebars
const hbs = exphbs.create({
	extname: '.hbs'
});

//setting view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//importing multer
var multer  = require('multer');
var upload = multer();

//setting multer
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/static/uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
   
var upload = multer({ 
	storage: storage 
});

//importing Feed controller
var feedController = require('./controllers/feedpage.js');


app.get('/', function(req,res) {
	res.render('home');
});

app.get('/feed', feedController.getFeed);
app.get('/myPost',feedController.statusPost);

// Start the app on pre defined port number
app.listen(PORT, function() {
	console.log("Application has started and running on port: ", PORT);
}).on('error', function(error) {
	console.log("Unable to start app. Error >>>>", error);
});