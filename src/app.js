const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utilities/geocode');
const forecast = require('./utilities/forecast')

// console.log(__dirname)

const app = express();

//setup port, heroku and default
const port = process.env.PORT || 3000

// paths for express configuration
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//wire up partials 
hbs.registerPartials(partialsPath);


//setup static directory
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: '@Dorin-David',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: 'Need some help?',
        name: '@Dorin-David',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        message: `It's cool to learn new things, isn't?`,
        name: '@Dorin-David',
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'no address provided'
        })
    }

    geocode(address, (err, response) => {
        if (err) {
            return res.send({ error: err })
        }
        let { latitude, longitude } = response;
        
        forecast(latitude, longitude, (err, response) => {
            if (err) {
                return res.send({ error: err })
            }
            res.send(response)
        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - help page not found',
        message: 'Help message not found',
        name: 'Dorio',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'page not found',
        message: 'ooops, 404!',
        name: 'Dorio',
    })
})


app.listen(port, () => {
    console.log(`Server started at ${port}`)
})
