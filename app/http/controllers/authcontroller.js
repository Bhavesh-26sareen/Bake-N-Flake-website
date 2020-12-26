const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authcontroller(){
    //factory functions  -> returns object
    return {
        login(req,res){
           res.render('auth/login')
        },
        logout(req,res) {
          req.logout()  
          return res.redirect('/login')
        },
        loginpost(req, res , next){
          passport.authenticate('local' , (err , user , info ) => {  //When the user submits his/her login credentials,
                                                                    // the passport.authenticate() method (used as middleware here)
                                                                    // will execute the callback that you have defined and supply it with the username and password from the POST request body. 
                                                                    //The passport.authenticate() method takes two parameters–the name of the strategy, and options.
            if(err) { 
              req.flash('error' , info.message)
              return next(err)
          }
          
          if(!user) {
            req.flash('error' , info.message)
            return res.redirect('/login')
          }
           req.logIn(user, (err) => {
             if(err){
                req.flash('error' , info.message)
                return next(err)
           }
           return res.redirect('/')
          })
         })(req,res,next)
        },
        register(req,res){
          res.render('auth/register')
        }, 
        async registerpost(req,res){ 
          //console.log(req.body)
          const { name , email , password } = req.body
          if(!name || !email || !password)
          { 
            req.flash('error' , 'All fields are required')
            req.flash('name', name)
            req.flash('email', email)
            return res.render('auth/register') ;
          }
          // check if email exist or not 
          User.exists({ email: email}, (err, result) =>{
            if(result){
              req.flash('error' , 'Email Already exist')
              req.flash('name', name)
             // req.flash('email', email)
              return res.render('auth/register') ;
            }
          })
          //hashing a password
          const hashedPassword = await bcrypt.hash(password, 10)
          //creating a user in database 
          const user = new User({
            name: name ,
            email: email,
            password: hashedPassword
          })

         user.save().then((user) => {


           return res.redirect('/') 
         }).catch(err=> {
          req.flash('error' , 'Something went wrong')
          return res.render('auth/register') ;
         })

        }
    }

}

module.exports= authcontroller