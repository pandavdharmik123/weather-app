const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) +'.json?access_token=pk.eyJ1IjoiZGJwYW5kYXY3IiwiYSI6ImNra2d0YWM5ZTE2d3oybm1uYXFtaDRhZnQifQ.BvC3aVF0WZu2qqz1HzIt1Q';

    request( {url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect with location service', undefined);
        } else if(response.body.features.length === 0){
            callback('Unable to find location', undefined);
        } else{
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lang: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    });
}



module.exports = geocode;