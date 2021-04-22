const form = document.querySelector('.weather-form');
const countryParagraph = document.querySelector('.country')
const locationParagraph = document.querySelector('.location')
const temperatureParagraph = document.querySelector('.temperature')
const error = document.querySelector('.error_message')
const responseCard = document.querySelector('.response');




async function retrieveForecast(event) {
    event.preventDefault()
    let formCopy = form.innerHTML;
    let address = document.querySelector('.location-input').value

    form.innerHTML = '<span>Loading, please wait...</span>'
    responseCard.style.display = 'none'

    let forecast = await fetch('http://localhost:3000/weather?address=' + address.trim())
    let response = await forecast.json()
    
    form.innerHTML = formCopy
    
    if (response.error) {
        error.innerHTML = response.error
        responseCard.innerHTML = error
        return
    }

    const { country, location, temperature } = response

    countryParagraph.innerHTML = `Country: <span>${country}</span>`
    locationParagraph.innerHTML = `Location: <span>${location}</span>`
    temperatureParagraph.innerHTML = `Temperature: <span>${temperature}</span>`
    responseCard.style.display = 'flex'

}

form.addEventListener('submit', retrieveForecast)