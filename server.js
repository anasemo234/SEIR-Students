const express = require('express');
const morgan = require('morgan');
const session = require('express-session')
const passport = require('passport')
const port = process.env.PORT || 3000;

// We'll need to load the env vars
require('dotenv').config();

// create the Express app
const app = express();

// connect to the MongoDB with mongoose by simply running the code inside of  ('./config/database')
require('./config/database');
// initialize oauth process for login requests by simply running the code inside of ('./config/passport')
require('./config/passport');

// require our routes
const indexRoutes = require('./routes/index');
const studentsRoutes = require('./routes/students');

// view engine setup
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO Add session middleware here
app.use(session({
  secret: 'SEIRRocks',
  resave: false,
  saveUninitialized: true
}))

// TODO Add passport middleware here
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);
app.use('/', studentsRoutes);



app.listen(port, () => {
  console.log(`Express is listening on port:${port}`);
});
