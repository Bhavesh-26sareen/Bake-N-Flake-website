function authcontroller(){
    //factory functions  -> returns object
    return {
        login(req,res){
           res.render('auth/login')
        },
        register(req,res){
          res.render('auth/register')
        }
    }

}

module.exports= authcontroller