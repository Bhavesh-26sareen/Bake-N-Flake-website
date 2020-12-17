const express = require('express')
const app = express() 

const ejs = require('ejs')
const path = require('path')

const expressLayout = require('express-Ejs-layouts')

const PORT = process.env.PORT || 3200
app.use(express.static('public'))
app.get('/' , (req,res) => {
    res.render('home') // here you render `home` template
})

// set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views')) // here you set that all templates are located in `/views` directory
app.set('view engine','ejs')//here you set that you're using `ejs` template engine, and the
                            // default extension is `ejs`


app.listen(PORT , () => {
  console.log('Listening on port 3000')
})

