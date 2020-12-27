//in js receiving same instance of object 
const homecontroller = require('../app/http/controllers/homecontroller') ;
const authcontroller = require('../app/http/controllers/authcontroller') ;
const cartcontroller = require('../app/http/controllers/customers/cartcontroller') ;
const ordercontroller = require('../app/http/controllers/customers/ordercontroller') ;
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admincontroller = require('../app/http/controllers/admin/admincontroller') ;
const adminauth = require('../app/http/middlewares/adminauth')
const statuscontroller = require('../app/http/controllers/admin/statuscontroller') ;


function initRoutes(app) {
 //app is the instance in which I have called a get method and passed 2 parameters (string) and function(anonymous)
    
    app.get('/' , homecontroller().index)
    app.get('/cart' , cartcontroller().index)
    app.get('/login',authcontroller().login) //login is a function which is located in authcontroller
    app.post('/login', authcontroller().loginpost)
    app.get('/register',guest, authcontroller().register)
    app.post('/register',authcontroller().registerpost)
    app.post('/update-cart',cartcontroller().update)
    app.post('/logout',authcontroller().logout)
    app.post('/orders' ,auth, ordercontroller().store)
    app.get('/orders',auth, ordercontroller().index)
    app.get('/orders/:id',auth, ordercontroller().show )
    app.get('/offers',homecontroller().offer)
    app.get('/admin/orders',adminauth, admincontroller().index)
    app.post('/admin/order/status',adminauth, statuscontroller().update)
    
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