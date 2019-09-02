const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json()
//         .then((data) => {
//             console.log(data)
//         })
// })

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const location = event.target.elements.input.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(`http://localhost:3000/weather?search=${location}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = `${data.summary} The temperature is currently ${data.temperature} degrees farenheit.`
        }
    })
})

