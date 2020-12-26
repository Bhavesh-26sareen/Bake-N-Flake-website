//model represent to the document which is present in database
//model is singular &  collection is plural


const mongoose = require('mongoose') ; 
//S in Schema is Capital which tells that it will save class or constructor in js
//const Schema = mongoose.Schema

//menuSchema is the skeleton or blueprint of our document present in db
const orderSchema = new mongoose.Schema({
     customerid: {
         type: mongoose.Schema.Types.ObjectId ,
         ref: "user",
         required: true
     },
     items: { type: Object , required: true},
     phone: { type: String , required: true },
     address: { type: String , required: true},
     paymenttype: { type: String , default: "COD"} ,
     status: { type: String , default: "Order_placed"},

}, {timestamps: true})

const Order = mongoose.model("order",orderSchema)

module.exports = Order

