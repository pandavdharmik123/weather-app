const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;

//Defines path for express config
const pathToDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars, views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to server
app.use(express.static(pathToDirectory));

app.get('', (req, res) => {
    res.render('index', {
        name: 'Dharmik Pandav',
        title: 'Weather'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Dharmik Pandav',
        title: 'About Me'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Dharmik Pandav',
        title: 'Help',
        helpText: 'This is a help text.'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Dharmik Pandav',
        title: '404',
        errorMessage: 'Help article not found'
    })
});

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide adreess.'
        });
    }
 /// Adress :: Surat,Gujarat India
//req.query.address
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error){
            return res.send({
                error: 'Unable to find location!'
            });
        }

        const city = location.split(' ')[0];
        // console.log(city);
        const country = location.split(' ')[2];
        // console.log(country)

        // let location = response.location;

        forcast(city, country, (error, data) => {
            if(error){
                return res.send({
                    error: 'Unable to find weather!!'
                });
            }
            // if(data){
            //     console.log('It is currently: ' + data.temperature + ' Degree out. This is ' + data.percentage + ' chnace for a rain');
            // }
            return res.send({
                forcast: data,
                location,
                address: city
            })
        });
    })
});


app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You msut provide search'
        })
    } 

    console.log(req.query.search);
    res.send({
        products: []
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Dharmik Pandav',
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Start server at 3000 port');
});

















/* 
app.get('/help', (req, res) => {
    res.send('This is help page!');
})  

app.get('/about', (req, res) => {
    res.send('<h1>This is about page!<h1>');
})
*/
app.get('/weather', (req, res) => {
    res.send({
        forcast: {
            temprature: 30,
            humidity: 0
        },
        location: {
            lang: 102.3232,
            lat: 28.5665
        }
     });
});

