
 let weatherCondition;

document.addEventListener('DOMContentLoaded', () => {
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
            weatherCondition = data.weather[0].main || 'Clouds';
            

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
                const getIsDayPerson = getIsDay(currentWeather.timezone);

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
                        conditionMain :currentWeather.conditionMain,
                        humidity: currentWeather.humidity,
                        weatherIcon: currentWeather.icon,
                        currentTime: currentWeather.time,
                        isDay: getIsDayPerson,
                        time: currentTimeNow,
                        timezoneOf : currentWeather.timezone
                    }
                };
            }
        }
        return null;
    };

    function updateCardOne(personWeather) {
        document.getElementById('city-name-1').innerText = personWeather.city;
        document.getElementById('country-name-1').innerText = personWeather.country;
        updateClockInRealTime(personWeather, 'current-time-1');
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

    const weatherTipDiv = document.getElementById('tip-content');
    const tipOfTheLoad = getWeatherTips(personOne.name,personTwo.name,personTwo.gender,weatherCondition = 'Clouds')
    weatherTipDiv.innerText = tipOfTheLoad;
    // console.log(weatherCondition);

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

    const getIsDay = (timezoneOffset) => {
        const nowUTC = new Date();
        const offsetInMilliseconds = timezoneOffset * 1000;
        const localTime = new Date(nowUTC.getTime() + offsetInMilliseconds);

        const hours = localTime.getUTCHours();
        const isDay = hours >= 6 && hours <= 18;
        return isDay;
    };

    const updateWeatherImage = (personWeather) => {
        const weatherImage = document.getElementById('card-person'); // Ensure the correct ID
        if (personWeather.gender === 'male') {
            weatherImage.src = personWeather.weather.isDay ? 'weather-img/b-day.png' : 'weather-img/b-night.png'; // Male image
        } else {
            weatherImage.src = personWeather.weather.isDay ? 'weather-img/g-day.png' : 'weather-img/g-night.png'; // Female image
        }
    };

    let clockIntervalID = null;

    const updateClockInRealTime = (personWeather) => {
        const clockElement = document.getElementById('current-time-1');
    
        // Clear the previous interval if it exists
        if (clockIntervalID !== null) {
            clearInterval(clockIntervalID);
        }
    
        // Start a new interval
        clockIntervalID = setInterval(() => {
            const currentTimeNow = getCurrentTimeInByTimezone(personWeather.weather.timezoneOf);
            clockElement.innerText = currentTimeNow;  // Update the clock display every second
        }, 1000); // Update every second
    };
    
    
});

function getWeatherTips(yourName, partnerName, gender, condition) {
    const tipsTemplate = {
        clear: [
            `Remind ${partnerName} to wear sunscreen while enjoying the beautiful weather! ☀️`,
            `Text ${partnerName} a cute message about how much you miss enjoying sunny days together! ❤️`,
            `Encourage ${partnerName} to take a moment to breathe in the fresh air and appreciate the day! 🌼`,
            `Send ${partnerName} a sweet note, letting {{pronoun}} know you're thinking of {{pronoun}} on this lovely day! 💌`,
            `Inspire ${partnerName} to explore a new park and take in the scenery! 🌳`,
            `Tell ${partnerName} how amazing {{pronoun.third}} is and that {{pronoun.third}} deserves to enjoy this beautiful weather! 🌞`,
            `Share a fun memory from a sunny day spent together with ${partnerName}! It always brings a smile! 😊`,
            `Suggest ${partnerName} to take a break to enjoy a favorite book outside today! 📚`,
            `Let ${partnerName} know that today is perfect for a spontaneous adventure, even if it's just around the neighborhood! 🚶‍♀️`,
            `Send ${partnerName} a reminder to stay hydrated and enjoy their day under the sun! 💧`,
            `Tell ${partnerName} to capture the beauty of the day with a few photos and share them with you! 📸`,
            `Message ${partnerName} and remind {{pronoun}} that {{pronounPos}} smile shines as bright as the clear sky! 😍`,
            `Encourage ${partnerName} to do something that makes {{pronoun}} happy today, whether big or small! 💖`,
            `Send ${partnerName} a funny meme about clear skies to brighten {{pronounPos}} mood! 😂`,
            `Let ${partnerName} know that {{pronoun.third}} should indulge in a favorite outdoor treat today! 🍦`,
            `Remind ${partnerName} to take a moment and enjoy the little things in nature around {{pronoun}}! 🌷`,
            `Tell ${partnerName} how much you wish you could share a picnic under the clear blue sky together! 🥪`,
            `Encourage ${partnerName} to take a leisurely walk and enjoy the sights and sounds of nature! 🍃`,
            `Text ${partnerName} a virtual hug to remind {{pronoun}} that {{pronoun.third}} is always in your heart! 🤗`,
            `Let ${partnerName} know that today is the perfect day for self-care, so {{pronoun.third}} should treat {{pronounPos}}self! 🌈`,
            `Remind ${partnerName} to enjoy some time with friends or family outdoors today! 👩‍❤️‍👨`
        ],
        
        clouds: [
            `Remind ${partnerName} that cloudy days can be cozy too! It's the perfect time for a warm drink! ☕️`,
    `Text ${partnerName} a sweet message to brighten up {{pronoun}} day! and let {{pronoun}} know that you're thinking of {{pronoun}}! ❤️`,
    `Encourage ${partnerName} to enjoy a cozy day inside, maybe with a favorite movie or book! 📖`,
    `Send ${partnerName} a virtual hug, reminding {{pronoun}} that you’re always close in spirit, rain or shine! 🤗`,
    `Suggest ${partnerName} to take a moment to appreciate the unique beauty of a cloudy sky! 🌥️`,
    `Tell ${partnerName} that today is a perfect day for baking something delicious together even if it's from afar! 🍰`,
    `Share a fun memory from a rainy day spent together with ${partnerName}! It always brings a smile! ☔️`,
    `Let ${partnerName} know it’s a great day for a comforting indoor hobby or craft! 🎨`,
    `Text ${partnerName} to remind {{pronoun}} that your love shines brighter than any cloudy day! ✨`,
    `Encourage ${partnerName} to take a few moments for self-care, like a bubble bath or a favorite show! 🛁`,
    `Tell ${partnerName} that today is perfect for a virtual coffee date, no matter the weather! ☕️💻`,
    `Message ${partnerName} to remind {{pronoun}} that every cloud has a silver lining! Keep looking for it! ☁️`,
    `Encourage ${partnerName} to reach out to a friend or family member for a chat; it can brighten {{pronoun}} day! 📞`,
    `Send ${partnerName} a funny meme about cloudy weather to lighten {{pronoun}} mood! 😂`,
    `Let ${partnerName} know that it's okay to take things slow today and embrace the cozy vibe! 🌈`,
    `Remind ${partnerName} to enjoy the calming sounds of the rain or the softness of the clouds! 🎶`,
    `Tell ${partnerName} how much you wish you could cuddle up together under a warm blanket right now! 🥰`,
    `Encourage ${partnerName} to write down a few things they're grateful for today, even on a cloudy day! ✍️`,
    `Text ${partnerName} to remind {{pronoun}} that cloudy days can lead to beautiful sunsets later! 🌅`,
    `Let ${partnerName} know you're just a message away if {{pronoun}} need a little extra love today! 💌`,
    `Remind ${partnerName} that gloomy days are just another opportunity to find joy in the little things! 🌈`

        ],
        
        rain:[
            `Remind ${partnerName} that rainy days are perfect for cuddling up with a cozy blanket! ☔️`,
            `Text ${partnerName} a sweet message to brighten {{pronoun}} day, even if it’s pouring outside! ❤️`,
            `Encourage ${partnerName} to enjoy the sound of the rain; it's nature’s lullaby! 🎶`,
            `Send ${partnerName} a virtual hug, reminding {{pronoun}} that you’re always close in spirit, no matter the weather! 🤗`,
            `Suggest ${partnerName} to take a moment to watch the rain and appreciate its calming beauty! 🌧️`,
            `Tell ${partnerName} that today is perfect for a movie marathon—get comfy! 🍿`,
            `Share a fun memory from a rainy day spent together with ${partnerName}! It always brings a smile! ☔️`,
            `Let ${partnerName} know it’s a great day for a warm drink and a good book! 📖`,
            `Text ${partnerName} to remind {{pronoun}} that even rainy days can be cozy and lovely! ☕️`,
            `Encourage ${partnerName} to have a self-care day, pampering {{pronoun}} with a bubble bath! 🛁`,
            `Tell ${partnerName} that it’s a perfect day for a virtual coffee date, no matter the weather! ☕️💻`,
            `Message ${partnerName} to remind {{pronoun}} that rain brings growth and new beginnings! 🌱`,
            `Encourage ${partnerName} to connect with a friend for a chat; it can brighten {{pronoun}} mood! 📞`,
            `Send ${partnerName} a funny meme about rain to lighten {{pronoun}} spirits! 😂`,
            `Let ${partnerName} know that it’s okay to take it easy today and relax indoors! 🌈`,
            `Remind ${partnerName} to enjoy the calming sounds of raindrops on the window! 🎶`,
            `Tell ${partnerName} how much you wish you could share a rainy day indoors, playing games together! 🎲`,
            `Encourage ${partnerName} to write down a few things they're grateful for today, even in the rain! ✍️`,
            `Text ${partnerName} to remind {{pronoun}} that rain can lead to beautiful rainbows later! 🌈`,
            `Let ${partnerName} know you're just a message away if {{pronoun}} need a little extra love today! 💌`,
            `Remind ${partnerName} that rainy days are just another opportunity to find joy in the little things! 🌧️`
        ],
        drizzle: [
                `Remind ${partnerName} that drizzly days can be perfect for a cozy indoor date with hot cocoa! ☕️`,
                `Text ${partnerName} a sweet message to brighten {{pronoun}} day and let {{pronoun}} know you’re thinking of {{pronoun}}! ❤️`,
                `Encourage ${partnerName} to take a moment to enjoy the gentle sound of drizzle; it’s soothing! 🌧️`,
                `Send ${partnerName} a virtual hug, reminding {{pronoun}} that you’re always close in spirit, rain or shine! 🤗`,
                `Suggest ${partnerName} wear a cute raincoat and splash in some puddles; it’s the little things! 🌂`,
                `Tell ${partnerName} that today is perfect for starting a new book or finishing an old one! 📖`,
                `Share a fun memory from a drizzly day spent together with ${partnerName}! It always brings a smile! 😊`,
                `Let ${partnerName} know it’s a great time for some comfort food or baking together with even from afar! 🍰`,
                `Text ${partnerName} to remind {{pronoun}} that drizzles can create beautiful reflections in puddles! 🌧️✨`,
                `Encourage ${partnerName} to take a moment for self-care, perhaps with a cozy blanket and a favorite show! 🛋️`
            ],
        snow: [
           `Remind ${partnerName} to bundle up and enjoy the beauty of the snowflakes falling! ❄️`,
           `Text ${partnerName} a sweet message to brighten {{pronoun}} day and let {{pronoun}} know how much you wish you could be there! ❤️`,
           `Encourage ${partnerName} to embrace the winter wonderland by taking a walk outside! 🌨️`,
           `Send ${partnerName} a virtual hug, reminding {{pronoun}} that you're always close in spirit, no matter the weather! 🤗`,
           `Suggest ${partnerName} make a snow angel or a snowman; it’s the perfect day for some fun! ☃️`,
           `Tell ${partnerName} that today is ideal for a cozy movie marathon with hot chocolate! 🍫🎥`,
           `Share a fun memory from a snowy day spent together with ${partnerName}! It always brings a smile! 😊`,
           `Let ${partnerName} know it’s a great time to stay warm indoors with a favorite book! 📚`,
           `Text ${partnerName} to remind {{pronoun}} that snow brings a special kind of magic to the world! ✨`,
          `Encourage ${partnerName} to take some photos of the beautiful snow and share them with you! 📸`,    
          `Share a cute winter activity ${partnerName} could try at home! ❄️`
        ],
        thunderstorm: [
            `Remind ${partnerName} that thunderstorms are a perfect excuse for a cozy night in! ⛈️`,
            `Text ${partnerName} a sweet message to brighten {{pronoun}} day, reminding {{pronoun}} that you’re thinking of {{pronoun}}! ❤️`,
            `Encourage ${partnerName} to find comfort in the sound of rain and thunder; it's nature’s symphony! 🎶`,
            `Send ${partnerName} a virtual hug, reminding {{pronoun}} that you’re always close in spirit, even during storms! 🤗`,
            `Suggest ${partnerName} curl up with a favorite blanket and binge-watch a new show! 📺`,
            `Tell ${partnerName} that it’s a great day for some hot cocoa and reading a good book! 📖`,
            `Share a fun memory from a thunderstorm spent together with ${partnerName}! It always brings a smile! 😊`,
            `Let ${partnerName} know that a stormy day is perfect for self-care—pamper {{pronoun}} with a relaxing bath! 🛁`,
            `Text ${partnerName} to remind {{pronoun}} that storms can bring refreshing energy and new beginnings! ⚡`,
            `Encourage ${partnerName} to take some time to listen to the rain and enjoy the cozy vibes! 🌧️`,
            `Tell ${partnerName} that today is perfect for baking together with even if it’s from afar! 🍪`,
            `Text ${partnerName} and remind {{pronoun}} to stay safe and warm during the storm! 🏡`,
            `Suggest ${partnerName} try some calming music to relax while the storm passes! 🎵`,
            `Let ${partnerName} know that you’re just a message away if {{pronoun}} need a little extra love today! 💌`,
            `Remind ${partnerName} that after the storm, there’s always a beautiful calm—just like your relationship! 🌈`
        ],
        fog: [
            `Remind ${partnerName} that foggy days are perfect for staying cozy indoors with a warm drink! ☕️`,
            `Text ${partnerName} a sweet message to brighten {{pronoun}} day, letting {{pronoun}} know how much you care! ❤️`,
            `Encourage ${partnerName} to embrace the mystery of the fog and enjoy a quiet walk! 🌫️`,
            `Send ${partnerName} a virtual hug, reminding {{pronoun}} that you’re always close in spirit, no matter the weather! 🤗`,
            `Let ${partnerName} know that foggy days are great for some reflection and taking a moment to relax! 🧘‍♀️`  ,      
            `Hey ${yourName}, it’s foggy! Remind ${partnerName} to enjoy the mysterious vibe! 🌫️`,
            `Suggest a peaceful walk to embrace the fog! 🚶‍♀️`,
            `Share a calming playlist to match the mood! 🎵`,
            `Encourage ${partnerName} to capture beautiful foggy photos! 📷`,
            `Text ${partnerName} a comforting message to brighten ${partnerName}'s day! 💖`
        ],
        mist: [
            `Hey ${yourName}, it’s misty! Perfect weather for a cozy indoor day! 🌫️`,
            `Suggest ${partnerName} curl up with a good book and some tea! 📚`,
            `Encourage ${partnerName} to enjoy the peaceful atmosphere! ☕️`,
            `Text ${partnerName} a sweet message to brighten their day! ❤️`,
            `Ask ${partnerName} to share their favorite cozy activities! 🌟`
        ],
        sand: [
            `Hey ${yourName}, it’s a sandstorm! Remind ${partnerName} to stay indoors and keep safe! 🌪️`,
            `Suggest ${partnerName} catch up on some reading or watch a movie! 🎬`,
            `Encourage ${partnerName} to enjoy some warm tea or coffee! ☕️`,
            `Text ${partnerName} a fun meme about the weather to lighten the mood! 😂`,
            `Ask ${partnerName} to share how they are staying entertained indoors! 📖`
        ],
        dust: [
            `Hey ${yourName}, there’s a dust storm outside! Keep your windows closed! 🌬️`,
            `Suggest ${partnerName} clean the house or organize something! 🧹`,
            `Encourage ${partnerName} to enjoy some indoor hobbies! 🎨`,
            `Text ${partnerName} a cute note to brighten their day! 💌`,
            `Remind ${partnerName} to stay safe and hydrated! 💧`
        ],
        ash: [
            `Hey ${yourName}, there’s ash in the air! Stay indoors and protect yourself! 🌋`,
            `Suggest ${partnerName} catch up on a favorite show! 📺`,
            `Encourage ${partnerName} to stay hydrated! 💧`,
            `Text ${partnerName} to remind them you care about their safety! ❤️`,
            `Ask ${partnerName} to share how they’re feeling in this weather! 😊`
        ],
        squall: [
            `Hey ${yourName}, it’s quite squally! Remind ${partnerName} to stay safe indoors! ⛈️`,
            `Suggest a cozy movie marathon for ${partnerName}! 🎬`,
            `Encourage ${partnerName} to have some warm soup to enjoy! 🍲`,
            `Text ${partnerName} a cute meme about the weather to lighten the mood! 😂`,
            `Ask ${partnerName} to share how they are keeping warm! 🌬️`
        ],
        tornado: [
            `Hey ${yourName}, it’s tornado weather! Remind ${partnerName} to stay safe! 🌪️`,
            `Encourage ${partnerName} to find a safe place and stay calm! 🚪`,
            `Text ${partnerName} to check in on them and send virtual hugs! 🤗`,
            `Suggest ${partnerName} keep updated on weather reports! 📺`,
            `Let ${partnerName} know you’re thinking of them during this time! ❤️`
        ]
    };

    const pronouns = gender.toLowerCase() === 'male' ? 
    { pronoun: 'him', pronounPos: 'his',pronounThird:'he'} : 
    { pronoun: 'her', pronounPos: 'her',pronounThird:'she' };

// Normalize the weather condition to a valid key
const normalizedCondition = condition.toLowerCase();

// Get tips for the specific weather condition
const tipsForCondition = tipsTemplate[normalizedCondition] || [
    `Hey ${partnerName}, just thinking of you on this day! 💖`
]; // Default message for unknown conditions

// Generate tips with replaced pronouns
const weatherTips = tipsForCondition.map(tip => 
    tip.replace(/{{pronoun}}/g, pronouns.pronoun)
       .replace(/{{pronounPos}}/g, pronouns.pronounPos)
       .replace(/{{pronoun.third}}/g, pronouns.pronounThird)
);
const randomIndex = Math.floor(Math.random() * weatherTips.length);

// Return a random tip
return weatherTips[randomIndex];
}

