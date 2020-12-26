const Order = require('../../../models/order')
const ordercontroller = require('../customers/ordercontroller')
const moment = require('moment')

function admincontroller(){
return {
    index(req,res){
         Order.find({ status: {$ne : 'completed'}},null, { sort: { 'createdAt': -1 } }).
         populate('customerid', '-password').exec((err,orders)=>{
            if(req.xhr){
                return res.json(orders);
            }else {
            return res.render('admin/adminorders')
            }
        })
        
    
    }
}
}

module.exports = admincontroller