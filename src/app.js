const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geoAPI, weatherAPI } = require('./requests')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kiwi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kiwi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Kiwi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'Please provide location' })
    }

    geoAPI(req.query.search)
        .then((location) => {
            return weatherAPI(location)
        })
        .then((weather) => {
            res.send(weather)
        })
        .catch((error) => {
            res.send({
                error
            })
        })
})

// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('About page')
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help page',
        subtitle: 'Help article not found',
        name: 'Kiwi'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        subtitle: 'Page not found',
        name: 'Kiwi'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})