const Order = require('../../../models/order')
const moment = require('moment')

function ordercontroller() {
    return {
         index : async(req,res)=> {
            try{
            const orders = await Order.find({ customerid: req.user._id},
                null, // To convert a MongoDB driver find() call to a Mongoose Model.find() call without chaining, add null as the 2nd argument.
                {sort: {'createdAt' : -1}}) //{ sort: { field: direction } } where field is the string fieldname test (in your case) and direction is a number where 1 is ascending and -1 is desceding.
            res.render('customers/order.ejs', {orders : orders, moment: moment})}
            catch (err) {next(err);}
        },
       async show(req,res) {
            const order = await Order.findById(req.params.id)
            
           
            if(req.user._id.toString() === order.customerid.toString())
            {
              return res.render('customers/ordertracking',{ order : order})   
            }
                return res.redirect('/')
            
        },
        store(req,res) {
          
          const { phone , address} = req.body
          if(!phone) {
              req.flash('error',"Phone Number required") ;
              return res.redirect('/cart')
          }
          if(!address) {
           
              req.flash('error',"Address required") ;
              return res.redirect('/cart')
          }
         const order = new Order({
             customerid: req.user._id,
             items: req.session.cart.items,
             phone: phone,
             address: address
         })
       
         order.save().then(result => {
             Order.populate(result, { path: 'customerid'} , (err,placed) => {
                req.flash('success',"Order Placed Successfully") 
                delete req.session.cart
                //emit 
               
                const eventemitter = req.app.get('eventemitter')
                 eventemitter.emit('orderplaced', placed)
                return res.redirect('/orders')
             })
            
         }).catch(err => {
            req.flash('error',"Something Went Wrong Please Try Again") ;
              return res.redirect('/cart')
         })

        },
        
    }
}

module.exports = ordercontroller