function guest (req , res , next) {
    if(req.isAuthenticated())
    {
        return next()
    }
    console.log("one")
    return res.redirect('/')
}


module.exports = guest