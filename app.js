const getWeatherData = async (latitude, longitude, hours = 24, days = 1) => {
    const apiKey = '2d7b6d17d1c0486181335548242409';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=${days}&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        let hourlyData = [];
        for (let i = 0; i < days; i++) {
            hourlyData = hourlyData.concat(data.forecast.forecastday[i].hour.slice(0, hours));
        }

        // Log the fetched data for debugging
        console.log("Hourly Data:", hourlyData);
        console.log("Full Weather Data:", data);

        return {
            hourly: hourlyData,
            daily: data.forecast.forecastday,
            current: data.current, // Include current weather data
            location: data.location // Include location data
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

let personOne, personTwo;

try {
    personOne = JSON.parse(localStorage.getItem('personOne')) || {};
    personTwo = JSON.parse(localStorage.getItem('personTwo')) || {};
} catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    personOne = {};
    personTwo = {};
}

const createPersonWeatherObjects = async (person) => {
    if (person.latitude && person.longitude) {
        const weatherData = await getWeatherData(person.latitude, person.longitude, 24, 1);
        if (weatherData) {
            const hourlyTemperatures = weatherData.hourly.map(hour => hour.temp_c);
            const minTemperature = Math.min(...hourlyTemperatures);
            const maxTemperature = Math.max(...hourlyTemperatures);
            
            const currentWeather = weatherData.current; // Access current weather details
            const currentTemperature = currentWeather.temp_c;
            const feelsLike = currentWeather.feelslike_c; // Feels like temperature
            const pressure = `${currentWeather.pressure_mb}`; // Pressure formatted as "1000 hPa"
            const windSpeed = currentWeather.wind_kph; // Wind speed in kph
            const condition = currentWeather.condition.text; // Weather condition text
            const humidity = currentWeather.humidity; // Humidity percentage
            const icon = currentWeather.condition.icon;
            return {
                name: person.name,
                gender: person.gender,
                country: person.country,
                city: person.city,
                weather: {
                    currentTemp : currentTemperature,
                    minTemperature: minTemperature,
                    maxTemperature: maxTemperature,
                    feelsLike: feelsLike,
                    pressure: pressure, // Pressure formatted with unit
                    windSpeed: windSpeed,
                    condition: condition,
                    humidity: humidity,
                    weatherIcon : icon
                }
            };
        }
    }
    return null;
};

function updateCardOne(personWeather) {
    document.getElementById('city-name-1').innerText = personWeather.city;
    document.getElementById('country-name-1').innerText = personWeather.country;
    document.getElementById('current-time-1').innerText = personWeather.weather.currentTime;

    // Round the temperatures to the nearest whole number and use innerHTML for degree symbol
    document.getElementById('temperature-1').innerHTML = `<span>${Math.round(personWeather.weather.currentTemp)}</span><span class="degree">&#176</span>`;
    document.getElementById('feels-like-1').innerHTML = `Feels like <span id="feels-like-temp-1"> ${Math.round(personWeather.weather.feelsLike)}&#176</span>`;
    document.getElementById('temp-min-1').innerHTML = `Min  ${Math.round(personWeather.weather.minTemperature)}&#176`;
    document.getElementById('temp-max-1').innerHTML = `Max  ${Math.round(personWeather.weather.maxTemperature)}&#176`;

    // Update additional weather details as needed
    document.getElementById('wind-speed-1').innerHTML = `${personWeather.weather.windSpeed} <span class="little-text">km/h</span>`;
    document.getElementById('humidity-1').innerText = `${personWeather.weather.humidity}%`;
    document.getElementById('pressure-1').innerHTML = `${personWeather.weather.pressure} <span class="little-text">hPa</span>`;

    // Update weather description
    document.getElementById('weather-description-1').querySelector('.scrolling-text').innerText = personWeather.weather.condition;

    // Update weather image based on condition
    const weatherIcon = document.getElementById('weather-icon-1');
    weatherIcon.src = `https:${personWeather.weather.weatherIcon}`;
}

function updateCardTwo(personWeather) {
    document.getElementById('temperature-2').innerHTML = `${Math.round(personWeather.weather.currentTemp)}<span class="degree">&#176;</span>`;
    document.getElementById('feels-like-2').innerHTML = `Feels like: <span id="feels-like-temp-2">${Math.round(personWeather.weather.feelsLike)}&#176;</span>`;
    document.getElementById('temp-min-2').innerHTML = `Min: ${Math.round(personWeather.weather.minTemperature)}&#176;`;
    document.getElementById('temp-max-2').innerHTML = `Max: ${Math.round(personWeather.weather.maxTemperature)}&#176;`;


}

// Example usage in the main function
// Assuming the rest of your code remains the same
const card1 = document.getElementById('card-1');
const card2 = document.getElementById('card-2');

let isPersonOneActive = true; // Track which person's weather is currently displayed

card2.addEventListener('click', async () => {
    // Swap the weather data on card click
    if (isPersonOneActive) {
        // Update card one with person two's weather and card two with person one's weather
        if (personTwoWeather) {
            updateCardOne(personTwoWeather);
        }
        if (personOneWeather) {
            updateCardTwo(personOneWeather);
        }
    } else {
        // Update card one with person one's weather and card two with person two's weather
        if (personOneWeather) {
            updateCardOne(personOneWeather);
        }
        if (personTwoWeather) {
            updateCardTwo(personTwoWeather);
        }
    }

    // Toggle the active state
    isPersonOneActive = !isPersonOneActive;
});

// Fetch and update weather data
const fetchWeatherForBothPersons = async () => {
    personOneWeather = await createPersonWeatherObjects(personOne);
    personTwoWeather = await createPersonWeatherObjects(personTwo);

    console.log("Person One Weather:", personOneWeather);
    console.log("Person Two Weather:", personTwoWeather);

    // Update both cards with the initial weather data
    if (personOneWeather) updateCardOne(personOneWeather);
    if (personTwoWeather) updateCardTwo(personTwoWeather);
};

fetchWeatherForBothPersons();
