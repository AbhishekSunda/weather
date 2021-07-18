const path  = require('path');
const express = require('express');
const hbs = require('hbs');


const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//setup handlebars engine and views location
app.set('view engine', 'hbs');
 app.set('views', viewsPath); //not necessary if we have 
//                         folder with name view in same root directory i.e. web-server
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather',
        name:'Abhishek Sunda'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhishek Sunda'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Abhishek Sunda'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({error:'Please provide address!'});

    }

    let address= req.query.address;
    geocode(address, (error, {longitude:long, latitude, location}={})=>{
        if(error){
            res.send({error});
            return;
        }
        forecast(latitude, long, (error, forecastData)=>{
            if(error){
                res.send({error});
                return;
            }
            res.send({
                address:req.query.address,
                forecast:forecastData,
                location
            })
        })
    })
    
})

app.get('/help/*', (req, res)=>{
    res.render('404' , {
        error: 'Help article not found',
        name:'Andrew Mead',
        title :'Error 404'
    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        name:'Andrew Mead',
        error:'Page not found',
        title:'Error 404'
    })
})

app.listen(3000, ()=>console.log("listening port 3000"));