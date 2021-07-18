const request = require('postman-request');



const url = "http://api.weatherstack.com/current";
let propertiesObject = { access_key:'260b9468fa4ab2041c868a6b163f8938', query:'New York'};

const forecast =(latitude, longitude, callback)=>{
    propertiesObject.query = latitude+','+longitude;
    // propertiesObject.query =[latitude, longitude];
    request({url:url, qs:propertiesObject, json:true}, (error, {body})=>{
        
        if(error){
            callback('unable to connect to weather api!!');
        }else if(body.error){
            callback('Unable to find location!!');
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
      
    });
}

module.exports = forecast;