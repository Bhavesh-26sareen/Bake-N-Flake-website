const express = require('express')
const app = express() 
  
const ejs = require('ejs')
const path = require('path')

const expressLayout = require('express-Ejs-layouts')

const PORT = process.env.PORT || 3300
app.use(express.static('public'))



// set template engine 
app.use(expressLayout) //code which will be used again and again will be put in layout.ejs
app.set('views', path.join(__dirname,'/resources/views')) // here you set that all templates are located in `/views` directory
app.set('view engine','ejs')//here you set that you're using `ejs` template engine, and the
                            // default extension is `ejs`
 
app.get('/' , (req,res) => {
    res.render('home') // here you render `home` template
})


app.get('/cart' , (req,res) => {
  res.render('customers/cart') //render cart.ejs template
})

app.get('/login' , (req,res) => {
  res.render('auth/login')
})
app.get('/register' , (req,res) => {
  res.render('auth/register')
})


app.listen(PORT , () => {
  console.log('Listening on port 3000')
})

