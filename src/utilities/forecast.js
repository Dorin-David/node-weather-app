const request = require('request');

function forecast(latitude, longitude, callback){
    const url = 'http://api.weatherstack.com/current?access_key=8d185668c1f331af5ffb353cef61bbbd&query=' + encodeURIComponent(latitude + ' ' + longitude);
    request({url, json: true}, (error, {body}) => {

        if(error){
            callback('Error, check your internet connection.')
        }
        else if(body.error){
            callback('Error with input')
        }
        else {
            callback(null, {
                country: body.location.country,
                location: body.location.name,
                // localTime: body.location.localtime,
                // observationTime: body.current.observation_time,
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                img: body.current.weather_icons[0]
            }
            )
        }
    })
}

module.exports = forecast;