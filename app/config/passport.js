const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user') 
const bcrypt = require('bcrypt')


function init(passport){
   // Tells Passport to use this strategy(callback) for the passport.authenticate() method
   passport.use(new LocalStrategy({usernameField: 'email'}, async function(email , password , done){
   const user = await User.findOne({ email: email})
   
    if(!user)
     {
        //If we don't find a user in the database, that doesn't mean there is an application error,
        //so we use `null` for the error value, and `false` for the user value
        return done(null , false , {message: "No user with this email"})
     }
     bcrypt.compare(password, user.password).then(match => {
         if(match) {
              // Since we have a valid user, we want to return no err and the user object
             return done(null , user , {message: 'Logged in successfully'})
         }
          // Since we have an invalid user, we want to return no err and no user
         return done(null , false, {message: 'Wrong username or password'})
     }).catch(err => {
        return done(null , false, {message: 'Something went wrong'})
     })
    
   }
   ))
   
   //when I as a developer want to save in a session when user logged in
   passport.serializeUser((user,done) => {
       done(null , user._id)
   })

   //this is used to get what i have save in session
   passport.deserializeUser((id , done) => {
    User.findById(id , (err,user) => {
         done(err , user)
    })
   })

}


module.exports = init