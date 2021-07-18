const request = require('postman-request');

const geocode = (address, callback)=>{
const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VuZGExIiwiYSI6ImNrcXMwbHJpcDEzMG4yb28xaWN3dGFsenIifQ.rV0vP-2C_EMJHiZVoTNBSg';
request({url:url, json:true}, (error, {body})=>{
    if(error){
        callback('unable to connect to mapbox api!!');
    }else if(body.features.length==0){
        callback('Unable to find the location, try different search!!');
    }
    else{
        callback(undefined, {
            longitude:body.features[0].center[0],
            latitude: body.features[0].center[1],
            location:body.features[0].place_name

        })
    }
});
}
module.exports=geocode;