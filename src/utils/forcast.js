const request = require('request');


const forcast = (city, country, callback) => {
    // const url = 'https://api.aerisapi.com/observations/' + city + country + '?client_id=1konKiLX5fR0Gk9urNigA&client_secret=v2rt1R6NXfdTRnQybXBEHgVBxFZA4vnY1qSOreRg';
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + country +'&APPID=0513e2460aa6d9bf57732a7c421db4cd';

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect weather service!', undefined);
        } 
        // else if(response.body.success === false){
        //     callback('Unable to find location', undefined);
        

        // } 
        else{
            // callback(undefined, {
            //     temperature: response.body.response.ob.tempC,
            //     percentage: response.body.response.ob.precipIN
            // })
            callback(undefined, 'It is currently: ' + response.body.main.temp + ' ℉ out, Humidity level is ' + response.body.main.humidity  + ' and ' + response.body.clouds.all + ' % chance for a rain.');
        }
    })

}

module.exports = forcast;






/* 
// const url = 'http://api.openweathermap.org/data/2.5/weather?q=Surat,in&APPID=0513e2460aa6d9bf57732a7c421db4cd';

const url = 'https://api.aerisapi.com/observations/surat,in?client_id=1konKiLX5fR0Gk9urNigA&client_secret=v2rt1R6NXfdTRnQybXBEHgVBxFZA4vnY1qSOreRg';

// const url = 'http://api.openweathermap.org/data/2.5/weather?q=Surat,in&cnt=7&appid=0513e2460aa6d9bf57732a7c421db4cd';

request({ url: url, json: true }, (error, response) => {
    // const data = JSON.parse(response.body);
    // console.log(data.main);
    // console.log(response.body.response.ob);

    if(error){
        console.log('Unable to reach weather service!');
    }else if(response.body.success === false){
        console.log('Unable to find location!')
    } else{
        console.log('It is currently: ' + response.body.response.ob.tempC + ' Degree out. This is ' + response.body.response.ob.precipIN + ' chnace for a rain');
    }
});
 */