const form = document.querySelector('.weather-form');
const countryParagraph = document.querySelector('.country')
const locationParagraph = document.querySelector('.location')
const temperatureParagraph = document.querySelector('.temperature')
const feelsLikeParagraph = document.querySelector('.feels-like-temperature')
const error = document.querySelector('.error_message')
const responseCard = document.querySelector('.response');




async function retrieveForecast(event) {
    event.preventDefault()
    let formCopy = form.innerHTML;
    let address = document.querySelector('.location-input').value
    
    if(!address) return 

    form.innerHTML = '<span>Loading, please wait...</span>'
    responseCard.style.display = 'none'

    let forecast = await fetch('/weather?address=' + address.trim())
    let response = await forecast.json()
    
    form.innerHTML = formCopy
    
    if (response.error) {
        error.innerHTML = response.error
        responseCard.innerHTML = error
        return
    }

    const { country, location, temperature, feelsLike, img } = response

    let weatherImg = document.createElement('img')
    weatherImg.src = img
    weatherImg.classList.add('weather-img')

    if(responseCard.firstElementChild.nodeName === "IMG"){
        responseCard.firstElementChild.replaceWith(weatherImg)
    } else {
        responseCard.prepend(weatherImg)
    }

    countryParagraph.innerHTML = `Country: <span>${country}</span>`
    locationParagraph.innerHTML = `Location: <span>${location}</span>`
    temperatureParagraph.innerHTML = `Temperature: <span>${temperature}</span>`
    feelsLikeParagraph.innerHTML = `Feels like: <span>${feelsLike}</span>`
    responseCard.style.display = 'flex'

}

form.addEventListener('submit', retrieveForecast)