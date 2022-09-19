const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



// passport.use <-- we use this to plug-in login options
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,

}, function (accessToken, refreshToken, profile, cb) {
    // a user has attempted a login
    // does this user already exist in our own database?
    // if they dont we create them
}))

// passport.serializeUser <-- gets called one time when user logs in to create a session


// passport.deserializeUser <-- get called with each request - 
// then decodes the cookie and looks up user in session storage creates req.user for us