const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const redis = require('redis');

// Create Redis Client
let client = redis.createClient();
client.on("error", function (err) {
    console.log("Error: " + err);
  });

client.on('connect', function(){
    console.log('Connected to Redis...');
});

// Set Port
const port = 3000;


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

// Search Page
app.get('/', function(req, res, next){
    res.render('searchusers');
});

// Search Processing
app.post('/user/search', function(req, res, next){
    let id = req.body.id;
    client.hgetall(id, function(err, obj){
        if(!obj){
            res.render('searchusers', {
                error: 'User does not exist'
            });
        }else{
            obj.id = id;
            res.render('details', {
                user: obj
            });
        }
    });
});

app.listen(port, function(){
    console.log('Server started on port '+port);
});