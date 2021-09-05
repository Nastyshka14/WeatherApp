const temperature = document.querySelector('.weather__main-temperature')
const city = document.querySelector('.weather__main-city')
const feelsLike = document.querySelector('.weather__feels-like')
const humidity = document.querySelector('.weather__humidity')
const windSpeed = document.querySelector('.weather__speed')
const input = document.querySelector('.header__form-input')
const submitBtn = document.querySelector('.header__form-btn')

document.addEventListener("DOMContentLoaded", app)

function app() {
    showWeatherInUserLocation()
    initInputCityListeners()
}

function showWeatherInUserLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        console.log(latitude)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b5a03b378e49085452cb14ec5350c1e9`)
            .then(response => response.json())
            .then(result => renderWeather(result))
    })
}

function initInputCityListeners() {
    submitBtn.addEventListener('click', (event) => {
        console.log(event.target)
        showTheSelectedWeather(input.value)
        input.value = ''
    })
    input.addEventListener('keypress', event => {
        if(event.keyCode === 13) {
            showTheSelectedWeather(input.value)
            input.value = ''
        }
    })
} 


async function showTheSelectedWeather(cityName) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b5a03b378e49085452cb14ec5350c1e9`)
        let weatherDB = await response.json()
        console.log(weatherDB)
        renderWeather(weatherDB)
    } catch {
        input.value = 'Incorrect city name!'        
    }
}

function renderWeather(DB) {
    let { name, main: {temp, feels_like, humidity}, wind: {speed} } = DB
    city.innerText = name
    temperature.innerText = convertCalvinToCelsius(temp)
    // weatherStatus.innerText = weather.description
    feelsLike.innerText = `Feels like: ${convertCalvinToCelsius(feels_like)}`
    // icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    windSpeed.innerText = `${speed} m/s`
    humidity.innerText = `${humidity} %`
}

function convertCalvinToCelsius(temp) {
    return `${Math.round(temp - 273.15)}°`
}