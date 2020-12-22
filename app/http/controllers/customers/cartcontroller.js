function cartcontroller(){
    //factory functions  -> returns object
    return {
        index(req,res){
           res.render('customers/cart')
        },
        update(req,res){
          
        //  let cart = {
        //    items: {
        //     //req.body example cakeid: {item: cakeobject,qty:0};
        //    },
        //    totalqty: 0 ,
        //    totalprice: 0
        //  }

 //for the first time creating cart and adding basic object structure
            //console.log(req.session.cart)
            if(!req.session.cart) // if session ke andar humara cart naam ke key nhi ha to use save kro pehla
            {
              req.session.cart ={ //creating property req.session.cart uske ke andhar ek object save kro
                  items: {},
                  totalqty: 0,
                  totalprice: 0
              }
            }
            // console.log(req.session.cart)
              let cart = req.session.cart
              
              //check if item does not exist in cart
            //  console.log(cart.items)
              if(!cart.items[req.body._id])
              {
                  cart.items[req.body._id] = 
                  { 
                      item: req.body,
                      qty: 1
                  }
                  cart.totalqty = cart.totalqty + 1 
                  cart.totalprice = cart.totalprice + req.body.price
              }
              else
              {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalqty = cart.totalqty + 1 
                cart.totalprice = cart.totalprice + req.body.price
                
              }
              //console.log("body" , req.body)
             // console.log(cart.items)
           //   console.log(req.session.cart)
            return res.json({totalqauntity: req.session.cart.totalqty})
        }
    }
 
}

module.exports= cartcontroller