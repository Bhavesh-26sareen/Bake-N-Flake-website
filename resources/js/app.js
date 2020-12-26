import axios from 'axios' //axios is used for sending the json data to server here in our example we are sending cake object
import Noty from 'noty' //noty library for alert messages
import moment from 'moment' //moment

import { initAdmin } from './admin'
//const initAdmin = require('./admin')

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
            
        }).show();
        
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


const alert = document.querySelector('#alert');
if (alert) {
    setTimeout(() =>{
        alert.remove()
    },2000)
}


//admin config 




let liitems = document.querySelectorAll('.line')
let input = document.querySelector('#hiddeninput') ;
let order = input ? input.value : null
order = JSON.parse(order)

function update(order){
    liitems.forEach((liitem) => { 
        liitem.classList.remove('completed')
        liitem.classList.remove('current')
    })
    let flag = true ;
    liitems.forEach((liitem) => {   
     let data = liitem.dataset.status 
     
     if(flag) {
       liitem.classList.add('completed')
    }
    
     if(data === order.status){
         flag = false ;
         if(liitem.nextElementSibling){
         liitem.nextElementSibling.classList.add('current')
         }
     }
    })
}
update(order)



//socket connection on client side

let socket = io()
initAdmin(socket)
//join
if(order){
socket.emit('join', `order_${order._id}`)
} 


//admin 
const admin = window.location.pathname
if(admin.includes('admin')){
socket.emit('join' , 'adminroom')
}

//listen emitted event from server.js

socket.on('orderupdated',(data) => {

    const updatedorder = { ...order }
    updatedorder.updateAt = moment().format() 
    updatedorder.status = data.status
    update(updatedorder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order Tracking Updated',
        progressBar: false,
        
    }).show();

})