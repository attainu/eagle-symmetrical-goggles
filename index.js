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

app.use(express.static('public'))

app.get('/profile', function(req,res) {
	res.render('home');
})

// Start the app on pre defined port number
app.listen(PORT, function() {
	console.log("Application has started and running on port: ", PORT);
}).on('error', function(error) {
	console.log("Unable to start app. Error >>>>", error);
});