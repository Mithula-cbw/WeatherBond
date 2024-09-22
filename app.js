const latitude = 35.6895; // Example latitude (Tokyo)
const longitude = 139.6917; // Example longitude (Tokyo)
const apiKey = '0903b5fd19207a57b0e5db973feace8f'; // Replace with your OpenWeatherMap API key

const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`; // Use 'imperial' for Fahrenheit
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log all weather details to the console
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

getWeather();

function swapCards(card1, card2) {
    card1.classList.toggle('top');

    if (card1.classList.contains('top')) {
        card1.style.position = 'absolute';
        card1.style.top = '25px';
        card1.style.left = '25px';
        card1.style.zIndex = 2;        
        card1.style.opacity = 1;

        card2.style.position = 'absolute';
        card2.style.top = '50px';
        card2.style.left = 'calc(30% - 25px)';
        card2.style.zIndex = 1;
        card2.style.opacity = 0.5;
    } else {
        card1.style.position = 'absolute';
        card1.style.top = '50px';
        card1.style.left = 'calc(30% - 25px)';
        card1.style.zIndex = 1;        
        card1.style.opacity = 0.5;

        card2.style.position = 'absolute';
        card2.style.top = '25px';
        card2.style.left = '25px';
        card2.style.zIndex = 2;
        card2.style.opacity = 1;
    }
}

const card1 = document.getElementById('card-1');
const card2 = document.getElementById('card-2');

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        swapCards(card1, card2);
    });
});
