const request = require('request');

function getGeo(address, callback){
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZG9yaW9kLWRhdmlkIiwiYSI6ImNra3MzaDBmZTBvZGgyb282Z3BtcG00NG8ifQ.0gQMRWVhvlKyVy2I4U21Rg&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to server')
        } else if(body.features.length === 0){
            callback('Error with input')
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
  
}


module.exports = getGeo;