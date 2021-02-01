// const { response } = require("express"); 

console.log('Client side javascript file!');


// fetch('http://localhost:3001/weather?address=Surat,Guajart')
// .then((response) =>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// });


var weatherForm = document.querySelector('form');
var search  = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Testing");

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value;
    const query = 'http://localhost:3000/weather?address=!' + location;
    console.log(query);
    fetch(query).then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent= 'Error!';
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;
            }

        })
    });
})




