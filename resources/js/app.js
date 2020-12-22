import axios from 'axios' //axios is used for sending the json data to server here in our example we are sending cake object
import Noty from 'noty' //noty library for alert messages

let addToCart = document.querySelectorAll('.add-to-cart')

let cartcounter = document.querySelector('#cartCounter')

function updateCart(cake){
    axios.post('/update-cart' , cake).then(res => 
        {
            cartcounter.innerText = res.data.totalqauntity
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
            
        }).show() ;
        
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
            layout: 'bottomRight'
        }).show() ;
    })
}

    addToCart.forEach((btn) =>{
        btn.addEventListener('click' , (e) =>{
        
        let cake = JSON.parse(btn.dataset.cake)  //to convert string into object
        
        updateCart(cake)
        //console.log(cake)
    })
})
