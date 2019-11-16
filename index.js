const express = require('express');
const app = express();
const PORT = 9090;
const moment = require('moment');

//importing body parser
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use('/public',express.static('public'));

//importing express handlebars
const exphbs = require('express-handlebars');

// Configure Handlebars
const hbs = exphbs.create({ extname: '.hbs' });

//setting view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


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

//importing Feed controller
var feedController = require('./controllers/feedpage.js');


app.get('/', function (req, res) {
	res.render('home');
});

/*
//mongodb setup starts here
const MongoClient = require('mongodb').MongoClient;
var db = null;
var url = 'mongodb://localhost:27017';
MongoClient.connect( url,{ useUnifiedTopology: true },function ( error, client ) {
    if(error){
        return console.log(error);
    }
    //console.log(client);
    db = client.db('mydb');
    db.createCollection("LikeEvent", function(err, res) {
        if (err){
            throw err;
        }
    });
});
// add a document to the DB collection recording the click event
app.post('/clicked', function (req, res){
    var click = {
        clickTime: new Date()
    };
    console.log(click);
  
    db.collection('likes').save(click, (err, result) => {
        if (err) {
            return console.log(err);
        }
        console.log("click added to db");
        res.sendStatus(201);
    });
});
// getting the click data from the database
app.get('/clicks', (req, res) => {
    db.collection('likes').find().toArray( (err, result) => {

        if (err) {
            return console.log(err);
        }
        res.send(result);
    });
});
//mongodb setup ends here
*/

app.get('/feed',feedController.getFeed);

var cpUpload = upload.fields([
	{ name: 'imageFile', maxCount: 1 },
	{ name: 'videoFile', maxCount: 1 },
	{ name: 'pdfFile', maxCount: 1 }
]);
app.post('/feed',urlencodedParser, feedController.addPost);

//app.post('/myPost', upload.none(), feedController.postStatus);
app.post('/uploadFiles', cpUpload, feedController.postFiles);

// Start the app on pre defined port number
app.listen(PORT, function () {
	console.log("Application has started and running on port: ", PORT);
}).on('error', function (error) {
	console.log("Unable to start app. Error >>>>", error);
});