const router = require('express').Router();
const passport = require('passport');

router.get('/', function (req, res) {
  res.render('index', {
    user: req.user
  });
});

// login route
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))
// callback route - called back/requested after user logs in
router.get('/oauth2callback', passport.authenticate('google', {
  successRedirect: '/students',
  failureRedirect: '/'
}))

// logout route
router.get('/logout', function (req, res) {
  req.logout(); // destroy the login session from the session store
  res.redirect('/') // send the user back to the homepage
})


module.exports = router;