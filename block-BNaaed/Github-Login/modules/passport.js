var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;
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