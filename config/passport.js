const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Student = require('../models/student');


// passport.use <-- we use this to plug-in login options
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,

}, function (accessToken, refreshToken, profile, cb) {
    // a user has attempted a login
    // does this user already exist in our own database?
    // lets check to see
    Student.findOne({ googleId: profile.id }, function (err, student) {
        // if they dont we create them
        // check for and handle errors
        if (err) return cb(err)
        // if student exists in our database - log them in!
        if (student) {
            return cb(null, student)
        } else {
            // student doesnt exist, create them instead
            const newStudent = new Student({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
            })
            newStudent.save(function (err) {
                if (err) return cb(err)
                // user/student saved successful
                return cb(null, newStudent)
            })
        }

    })
}))

// passport.serializeUser <-- gets called one time when user logs in to create a session


// passport.deserializeUser <-- get called with each request - 
// then decodes the cookie and looks up user in session storage creates req.user for us