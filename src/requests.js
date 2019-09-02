const request = require('request')

const geoAPI = (loc = '') => new Promise((resolve, reject) => {
    const encodeAddress = encodeURIComponent(loc)
    const token = 'pk.eyJ1Ijoia2l3aS1yYWUiLCJhIjoiY2pzdTByMTZkMjk2MzQ1c3oyejVkYm55MCJ9.opSOVe63cTNLw0B_SvHh9g'

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeAddress}.json?access_token=${token}`

    request({ url, json: true }, (error, response) => {

        if (error) {
            return reject('Unable to connect to location service')
        } else if (response.body.features.length === 0) {
            return reject('No search results')
        }

        const location = response.body.features[0].place_name
        const [lng, lat] = response.body.features[0].center
        resolve({ lat, lng, location })

    })
})

const weatherAPI = ({lat, lng, location} = {}) => new Promise((resolve, reject) => {
    const token = '5091aca751f66b116518d6a17310e4f4'

    const url = `https://api.darksky.net/forecast/${token}/${lat},${lng}`

    request({ url, json: true }, (error, response) => {
        if (error) {
            return reject('Unable to connect to weather service')
        } else if (response.body.error) {
            return reject('Unable to find location')
        }

        const data = response.body
        const sum = `${location}. ${data.hourly.summary} The temperature is currently ${data.currently.temperature} degrees farenheit.`
        resolve({
            location,
            summary: data.hourly.summary,
            temperature: data.currently.temperature
        })
    })
})

module.exports = { geoAPI, weatherAPI }