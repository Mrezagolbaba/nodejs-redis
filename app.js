const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const redis = require('redis');

// Set Port
const port = 3080;


// Init App
const app = express();


//setup view engine
app.engine('handlebars', exphbs.engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Method Override Middleware
app.use(methodOverride('_method'));

app.get('/', function(req, res, next){
    res.render('searchusers');
});

app.listen(port, function(){
    console.log('Server started on port '+port);
});