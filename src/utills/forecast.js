const request = require('request')
const forecast= (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/8105eeed5a44c7f587ae28185872e341/'+latitude+','+longitude

    request({ url,json:true},(error,{body})=>{
        if(error){
                callback('unable to connect to weather service',undefined)
        } else if (body.error){
                callback('unable to find location ',undefined)
        } else{
        
                callback(undefined,body.daily.data[0].summary + ' it is currently ' +body.currently.temperature +' degree out. this high today is '+ body.daily.data[0].temperatureHigh + ' with a low of '+ body.daily.data[0].temperatureLow +'there is  '+ body.currently.precipProbability +'  chance of rain')
        }

    })
}
module.exports = forecast