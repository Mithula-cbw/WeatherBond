// Function to fetch current weather from OpenWeather
const getOpenWeatherData = async (latitude, longitude) => {
    const apiKey = '0903b5fd19207a57b0e5db973feace8f'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return {
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            timezone: data.timezone,
            time: new Date(data.dt * 1000).toLocaleTimeString(), // Convert UTC time to local time
        };
    } catch (error) {
        console.error('Error fetching current weather data:', error);
        return null;
    }
};

// Function to fetch hourly weather data from WeatherAPI
const getWeatherAPIHourlyData = async (latitude, longitude, hours = 24, days = 1) => {
    const apiKey = '2d7b6d17d1c0486181335548242409'; // Replace with your WeatherAPI key
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

        return hourlyData;
    } catch (error) {
        console.error('Error fetching hourly weather data:', error);
        return null;
    }
};

const createPersonWeatherObjects = async (person) => {
    if (person.latitude && person.longitude) {
        const currentWeather = await getOpenWeatherData(person.latitude, person.longitude);
        const hourlyData = await getWeatherAPIHourlyData(person.latitude, person.longitude, 24, 1);

        if (currentWeather && hourlyData) {
            const hourlyTemperatures = hourlyData.map(hour => hour.temp_c);
            const minTemperature = Math.min(...hourlyTemperatures);
            const maxTemperature = Math.max(...hourlyTemperatures);
            const currentTimeNow = getCurrentTimeInByTimezone(currentWeather.timezone);

            return {
                name: person.name,
                gender: person.gender,
                country: person.country,
                city: person.city,
                weather: {
                    currentTemp: currentWeather.temp,
                    minTemperature: minTemperature,
                    maxTemperature: maxTemperature,
                    feelsLike: currentWeather.feelsLike,
                    pressure: currentWeather.pressure,
                    windSpeed: currentWeather.windSpeed,
                    condition: currentWeather.condition,
                    humidity: currentWeather.humidity,
                    weatherIcon: currentWeather.icon,
                    currentTime: currentWeather.time,
                    time: currentTimeNow
                }
            };
        }
    }
    return null;
};

function updateCardOne(personWeather) {
    document.getElementById('city-name-1').innerText = personWeather.city;
    document.getElementById('country-name-1').innerText = personWeather.country;
    document.getElementById('current-time-1').innerText = personWeather.weather.time;

    document.getElementById('temperature-1').innerHTML = `<span>${Math.round(personWeather.weather.currentTemp)}</span><span class="degree">&#176</span>`;
    document.getElementById('feels-like-1').innerHTML = `Feels like <span id="feels-like-temp-1"> ${Math.round(personWeather.weather.feelsLike)}&#176</span>`;
    document.getElementById('temp-min-1').innerHTML = `Min  ${Math.round(personWeather.weather.minTemperature)}&#176`;
    document.getElementById('temp-max-1').innerHTML = `Max  ${Math.round(personWeather.weather.maxTemperature)}&#176`;

    document.getElementById('wind-speed-1').innerHTML = `${personWeather.weather.windSpeed} <span class="little-text">km/h</span>`;
    document.getElementById('humidity-1').innerText = `${personWeather.weather.humidity}%`;
    document.getElementById('pressure-1').innerHTML = `${personWeather.weather.pressure} <span class="little-text">hPa</span>`;

    document.getElementById('weather-description-1').querySelector('.scrolling-text').innerText = personWeather.weather.condition;

    const weatherIcon = document.getElementById('weather-icon-1');
    weatherIcon.src = personWeather.weather.weatherIcon;
}

function updateCardTwo(personWeather) {
    document.getElementById('temperature-2').innerHTML = `${Math.round(personWeather.weather.currentTemp)}<span class="degree">&#176;</span>`;
    document.getElementById('feels-like-2').innerHTML = `Feels like: <span id="feels-like-temp-2">${Math.round(personWeather.weather.feelsLike)}&#176;</span>`;
    document.getElementById('temp-min-2').innerHTML = `Min: ${Math.round(personWeather.weather.minTemperature)}&#176;`;
    document.getElementById('temp-max-2').innerHTML = `Max: ${Math.round(personWeather.weather.maxTemperature)}&#176;`;
    

    updateWeatherImage(personWeather);
}

// Example usage in the main function
const card1 = document.getElementById('card-1');
const card2 = document.getElementById('card-2');

let isPersonOneActive = true;

card2.addEventListener('click', async () => {
    if (isPersonOneActive) {
        if (personTwoWeather) {
            updateCardOne(personTwoWeather);
        }
        if (personOneWeather) {
            updateCardTwo(personOneWeather);
        }
    } else {
        if (personOneWeather) {
            updateCardOne(personOneWeather);
        }
        if (personTwoWeather) {
            updateCardTwo(personTwoWeather);
        }
    }
    isPersonOneActive = !isPersonOneActive;
});

let personOne, personTwo;

try {
    personOne = JSON.parse(localStorage.getItem('personOne')) || {};
    personTwo = JSON.parse(localStorage.getItem('personTwo')) || {};
} catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    personOne = {};
    personTwo = {};
}

const fetchWeatherForBothPersons = async () => {
    personOneWeather = await createPersonWeatherObjects(personOne);
    personTwoWeather = await createPersonWeatherObjects(personTwo);

    console.log("Person One Weather:", personOneWeather);
    console.log("Person Two Weather:", personTwoWeather);

    if (personOneWeather) updateCardOne(personOneWeather);
    if (personTwoWeather) updateCardTwo(personTwoWeather);
};

fetchWeatherForBothPersons();

// Function to find the current time in GMT based on the provided timezone offset
const getCurrentTimeInByTimezone = (timezoneOffset) => {
    const nowUTC = new Date();
    const offsetInMilliseconds = timezoneOffset * 1000;
    const gmtTime = new Date(nowUTC.getTime() + offsetInMilliseconds);

    let hours = gmtTime.getUTCHours();
    const minutes = gmtTime.getUTCMinutes();
    
    const ampm = hours >= 12 ? ' pm' : ' am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${formattedMinutes}${ampm}`;
};

const updateWeatherImage = (personWeather) => {
    const weatherImage = document.getElementById('card-person'); // Make sure to use the correct ID for the image
    const now = new Date();
    const hours = now.getUTCHours(); // Get UTC hours
    const isDayTime = hours >= 6 && hours < 18; // Daytime from 6 AM to 6 PM

    if (personWeather.gender === 'male') {
        weatherImage.src = isDayTime ? 'weather-img/b-day.png' : 'weather-img/b-night.png'; // Update to day/night image
    } else {
        // You can add different conditions for female or other genders if needed
        weatherImage.src = isDayTime ? 'weather-img/g-day.png' : 'weather-img/g-night.png'; // Update to day/night image for female
    }
};
