var express = require('express');
var router = express.Router();
var passport = require('passport')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//login with GitHub

router.get('/auth/github',
  passport.authenticate('github'));


  router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/articles/new');
  });

// login with Gogle

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/articles/new');
  });


module.exports = router;
