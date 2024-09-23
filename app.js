const apiKey = '0903b5fd19207a57b0e5db973feace8f'; // Replace with your OpenWeatherMap API key

// Function to fetch weather data for a given latitude and longitude
const getWeather = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            weatherDescription: data.weather[0].description,
            pressure: data.main.pressure,
            timezone: data.timezone
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

// Load personOne and personTwo from localStorage with error handling
let personOne, personTwo;
try {
    personOne = JSON.parse(localStorage.getItem('personOne')) || {};
    personTwo = JSON.parse(localStorage.getItem('personTwo')) || {};
} catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    personOne = {};
    personTwo = {};
}

// Function to fetch and display weather information
const fetchAndDisplayWeather = async (person, cardIdSuffix) => {
    if (person.latitude && person.longitude) {
        const weatherData = await getWeather(person.latitude, person.longitude);
        if (weatherData) {
            const personWeather = {
                name: person.name,
                gender: person.gender,
                country: person.country,
                city: person.city,
                weather: weatherData
            };

            const roundedTemperature = Math.round(weatherData.temperature);
            document.getElementById(`temperature-${cardIdSuffix}`).innerHTML = `${roundedTemperature}<span class="degree">&#176;</span>`;
            document.getElementById(`city-name-${cardIdSuffix}`).textContent = personWeather.city;
            document.getElementById(`country-name-${cardIdSuffix}`).textContent = personWeather.country;

            const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false });
            document.getElementById(`current-time-${cardIdSuffix}`).textContent = currentTime;

            document.getElementById(`weather-description-${cardIdSuffix}`).textContent = personWeather.weather.weatherDescription;

            document.getElementById(`temperature-${cardIdSuffix}`).innerHTML = `${roundedTemperature}<span class="degree">&#176;</span>`;
            document.getElementById(`feels-like-temp-${cardIdSuffix}`).innerHTML = `${Math.round(personWeather.weather.feelsLike)}&#176;`;
            document.getElementById(`temp-min-${cardIdSuffix}`).innerHTML = `Min ${Math.round(personWeather.weather.tempMin)}&#176;`;
            document.getElementById(`temp-max-${cardIdSuffix}`).innerHTML = `Max ${Math.round(personWeather.weather.tempMax)}&#176;`;
            document.getElementById(`wind-speed-${cardIdSuffix}`).innerHTML = `${personWeather.weather.windSpeed} <span class="little-text">km/h</span>`;
            document.getElementById(`humidity-${cardIdSuffix}`).textContent = `${personWeather.weather.humidity}%`;
            document.getElementById(`pressure-${cardIdSuffix}`).innerHTML = `${personWeather.weather.pressure} <span class="little-text">hPa</span>`;
        }
    }
};
// Event listener for DOMContentLoaded to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display weather information for personOne and personTwo
    fetchAndDisplayWeather(personOne, 1); // For personOne, using the suffix '1' for card elements

});

const card2 = document.getElementById('card-2');

card2.addEventListener('click',()=>{
    fetchAndDisplayWeather(personTwo,1);
});