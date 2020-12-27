const Menu = require('../../models/menu')
function homecontroller(){
    //factory functions  -> returns object
    return {
        async index(req,res){ //async means that function will always return the promise

        //One MEthod
        //    Menu.find().then(function(cakes){
          
        //     return res.render('home', {cakes: cakes})
        //    })
           //second method
           const cakes = await Menu.find()
           // console.log(cakes)
           return res.render('home', {cakes: cakes})
        },
        offer(req,res){
            return res.render('offer')
        }
    } 

}

module.exports= homecontroller