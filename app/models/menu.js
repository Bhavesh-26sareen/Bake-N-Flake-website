//model represent to the document which is present in database
//model is singular &  collection is plural


const mongoose = require('mongoose') ; 
//S in Schema is Capital which tells that it will save class or constructor in js
//const Schema = mongoose.Schema

//menuSchema is the skeleton or blueprint of our document present in db
const menuSchema = new mongoose.Schema({
     name: {type: String, required: [true, "No Name Specified"]},
     image: { type: String, required: true},
     price: {type: Number, required: true},
     size: { type: String, required: true}
})

const Menu = mongoose.model("menu",menuSchema)

module.exports = Menu

