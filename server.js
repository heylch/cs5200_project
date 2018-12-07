var app = require('./express');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var bodyParser = require('body-parser');



app.use(session({
    secret: 'cat',//process.env.SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(app.express.static(__dirname + '/public/project'));

var port = process.env.PORT || 3000;

// require("./assignment/app");
// require("./test/app");
require("./project/app");

app.listen(port);
