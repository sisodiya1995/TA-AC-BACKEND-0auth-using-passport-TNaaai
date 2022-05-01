var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../modals/user')

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile)
     
      var profileData = {
          name :profile.displayName,
         username : profile.username ,
        email :profile._json.blog,
        photo :profile._json.avatar_url

      }
    User.findOne({email:profile._json.blog},(err,user) => {
        if(err) return done(err);
        if(!user) {
            User.create(profileData ,(err ,addedUser) => {
                if(err) return done(err);
                return done(null ,addedUser) 
            })
        }
        done(null ,user)
    })
  }
));

passport.serializeUser((user ,done) => {
    done(null ,user.id)
})

passport.deserializeUser(function (id,done) {
    User.findById(id, "name email username",function (err,user){
       done(err ,user)
    })
})

//google auth
passport.use(new GoogleStrategy({
    clientID: process.env.CLINTID,
    clientSecret: process.env.CLINTSECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile , 'google data')
      var profileData = {
        name :profile._json.name,
       username : profile._json.family_name,
      email :profile._json.email,
      photo :profile._json.picture

    }

    User.findOne({email:profile._json.email},(err,user) => {
        if(err) return done(err);
        if(!user) {
            User.create(profileData ,(err ,addedUser) => {
                if(err) return done(err);
                return done(null ,addedUser) 
            })
        }
        done(null ,user)
    })

  }
));