const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 9090;

app.use(express.json());
app.use(express.urlencoded())

// Configure Handlebars
const hbs = exphbs.create({
	extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

var UpdateRoute = require('./controllers/settings.js');

app.get('/', function(req,res) {
	res.render('home');
})

app.put('/settings', UpdateRoute.edit);

// Start the app on pre defined port number
app.listen(PORT, function() {
	console.log("Application has started and running on port: ", PORT);
}).on('error', function(error) {
	console.log("Unable to start app. Error >>>>", error);
});