//in js receiving same instance of object 
const homecontroller = require('../app/http/controllers/homecontroller') ;
const authcontroller = require('../app/http/controllers/authcontroller') ;
const cartcontroller = require('../app/http/controllers/customers/cartcontroller') ;
function initRoutes(app) {
 //app is the instance in which I have called a get method and passed 2 parameters (string) and function(anonymous)
    
    app.get('/' , homecontroller().index)
    app.get('/cart' , cartcontroller().index)
    app.get('/login',authcontroller().login) //login is a function which is located in authcontroller
    app.get('/register',authcontroller().register)
    
    app.post('/update-cart',cartcontroller().update)
    

    //   (req,res) => {
    //     res.render('auth/register')
    //   })
     //homecontroller().index same as (req,res)=>{res.render}
    // (req,res) => {
    //     res.render('home') // here you render `home` template
    // }) 
    // (req,res) => {
    //     res.render('customers/cart') //render cart.ejs template
    //   })
    //(req,res) => {
    //     res.render('auth/login')
    //   })
      
}


module.exports = initRoutes