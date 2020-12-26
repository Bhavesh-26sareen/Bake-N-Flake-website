function auth (req , res , next) {
   //console.log(req.user.role == 'admin')
    if(req.isAuthenticated())
    {
        return next()
    }
   
    return res.redirect('/login')

}


module.exports = auth
