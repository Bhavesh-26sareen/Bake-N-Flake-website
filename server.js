// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config()

const express = require('express') //
const app = express() // //here app is the instance of the express serrver 
  
const ejs = require('ejs')   //
const path = require('path') //

const mongoose = require('mongoose') //
const session = require('express-session')           
const flash = require('express-flash')

const Emitter = require('events')


//to save the session into db require connect-mongo module  
const MongoDbStore = require('connect-mongo')(session)

//database connection 
//const url = 'mongodb://localhost:27017/cake'; //
const url = 'mongodb+srv://admin-bhavesh:jaimatadi@cluster0.tdue7.mongodb.net/cake';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,});//, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify : true}) ;
const connection = mongoose.connection;
connection.once('open', () => { //open is a event listener 
  console.log('Database connected...');
}).catch(err => {
  console.log('Connection failed...')
}); 

//Event emitter
const eventemitter = new Emitter()
app.set('eventemitter', eventemitter) //binding app with emitter




//session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection, //using default database cake
  collection: 'sessions' //creates collection in db of name sessions
})
//session config 
//session library works as a middleware
//passing object to the session function
app.use(session({
  secret: process.env.COOKIE_SECRET, //if cookie session then used secret is very important //use to encrypt the cookie as it will provide extra level of security as cookie stores only the session id not the user details
  resave: false, //saves the cookie on each client <--> communitcation
  store: mongoStore,
  saveUninitialized: false, // if true then means save cookie even if nothing to track
  cookie: { maxAge: 1000 * 60 * 60 * 24 } //24hrs

}))
app.use(flash())


//passport config
const passport = require('passport')
const passportinit = require('./app/config/passport')
passportinit(passport)
app.use(passport.initialize());
app.use(passport.session()) ;

const expressLayout = require('express-Ejs-layouts') //
//const session  = require('express-session')

const PORT = process.env.PORT || 3300 //
app.use(express.static('public'))   //






//Global middleware -> to avail the session key in the layout.ejs we have to mount the session on locals
app.use((req,res,next) => {

      res.locals.session = req.session ;
      res.locals.user = req.user ;
      
      next()
})


//To receive data on server of json(request)  notation we need to enable to tell server that we are receiving json data
app.use(express.json()) 
//
app.use(express.urlencoded({extended: false}))


// set template engine 
app.use(expressLayout) //code which will be used again and again will be put in layout.ejs
app.set('views', path.join(__dirname,'/resources/views')) // here you set that all templates are located in `/views` directory
app.set('view engine','ejs')//here you set that you're using `ejs` template engine, and the
                            // default extension is `ejs`
//move all these routes to the routes folder(web.js) file otherwise servcer.js will become very large  
// app.get('/' , (req,res) => {
//     res.render('home') // here you render `home` template
// })
require('./routes/web') (app)   //passing instance of app
 
// app.get('/cart' , (req,res) => {
//   res.render('customers/cart') //render cart.ejs template
// })

// app.get('/login' , (req,res) => {
//   res.render('auth/login')
// })
// app.get('/register' , (req,res) => {
//   res.render('auth/register')
// })


 const server = app.listen(PORT , () => {
   console.log('Listening on port 3300')
 })
  
const io = require('socket.io')(server) 
io.on('connection',(socket) => {
   // join the client(browser)
    socket.on('join', (orderid) => {
      socket.join(orderid)
    })
  
})

//receving emit emitter
eventemitter.on('updatedorder',(data) => {
  io.to(`order_${data.id}`).emit('orderupdated',data)
})





//receving emit emitter for admin 
eventemitter.on('orderplaced',(data) => {
  io.to('adminroom').emit('orderplaced',data)
})
