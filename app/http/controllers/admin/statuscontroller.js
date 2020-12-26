const order = require ('../../../models/order')
function statuscontroller(){
    return {
        update(req,res) {
           
            order.updateOne({_id: req.body.orderId}, {status: req.body.status}, (err,data) => {
                if(err) {

                    return res.redirect('/admin/orders')
                }
                //Emit event
                const eventemitter = req.app.get('eventemitter')
                eventemitter.emit('updatedorder', { id: req.body.orderId, status: req.body.status})
               return res.redirect('/admin/orders')
            })
        }
    }
}


module.exports = statuscontroller