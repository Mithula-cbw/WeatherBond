document.addEventListener("DOMContentLoaded", () => {
    initializeSearch();
});

let countryInput, cityInput, countryAutocompleteList, cityAutocompleteList;
let selectedCountryCode = '';

function initializeSearch() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous content

    // Country search panel
    const countryPanel = document.createElement('div');
    countryPanel.className = 'search-panel';

    countryInput = document.createElement('input');
    countryInput.className = 'my-input';
    countryInput.id = 'country-input';
    countryInput.type = 'text';
    countryInput.placeholder = 'Search for a country...';

    countryAutocompleteList = document.createElement('div');
    countryAutocompleteList.id = 'country-autocomplete-list';
    countryAutocompleteList.className = 'autocomplete-items';

    countryPanel.appendChild(countryInput);
    countryPanel.appendChild(countryAutocompleteList);
    content.appendChild(countryPanel);

    // City search panel
    const cityPanel = document.createElement('div');
    cityPanel.className = 'search-panel';
    cityPanel.style.display = 'none'; // Initially hidden

    cityInput = document.createElement('input');
    cityInput.className = 'my-input';
    cityInput.id = 'city-input';
    cityInput.type = 'text';
    cityInput.placeholder = 'Search for a city...';

    cityAutocompleteList = document.createElement('div');
    cityAutocompleteList.id = 'city-autocomplete-list';
    cityAutocompleteList.className = 'autocomplete-items';

    cityPanel.appendChild(cityInput);
    cityPanel.appendChild(cityAutocompleteList);
    content.appendChild(cityPanel);

    // Event listeners
    countryInput.addEventListener('input', async (event) => {
        const query = event.target.value;
        if (query.length > 0) { // Start searching after 3 characters
            const countries = await fetchCountries(query); // Fetch countries from API
            showCountryAutocomplete(countries);
        } else {
            countryAutocompleteList.innerHTML = ''; // Clear suggestions if query is too short
        }
    });

    cityInput.addEventListener('input', async (event) => {
        const query = event.target.value;
        if (query.length > 0 ) { // Check if country is selected
            const cities = await fetchCities(query, selectedCountryCode); // Fetch cities from API
            showCityAutocomplete(cities);
        } else {
            cityAutocompleteList.innerHTML = ''; // Clear suggestions if query is too short or no country is selected
        }
    });
}

const apiKey = 'f90944973222ee9a70511676c51fdb77'; // Replace with your OpenWeather API key

async function fetchCountries(query) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await response.json();
        const countries = data
            .filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
            .map(country => ({
                name: country.name.common,
                code: country.cca2.toLowerCase()
            }));
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

async function fetchCities(query, countryCode) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${apiKey}`);
        const data = await response.json();
        // console.log('API Response:', data); // Log response for debugging
        const cities = data
            .filter(location => location.country.toLowerCase() === countryCode)
            .map(location => ({
                name: location.name,
                country: location.country
            }));
        console.log('Filtered Cities:', cities); // Log filtered cities for debugging
        return cities;
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}

function showCountryAutocomplete(countries) {
    countryAutocompleteList.innerHTML = ''; // Clear previous suggestions
    const maxResults = 5; // Maximum number of results to show

    // Loop through the countries, but only display up to 10 results
    countries.slice(0, maxResults).forEach(country => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerText = country.name;
        div.addEventListener('click', () => {
            selectedCountryCode = country.code; // Save selected country code
            countryInput.value = country.name;
            countryAutocompleteList.innerHTML = ''; // Clear suggestions
            document.querySelector('.search-panel:nth-child(2)').style.display = 'block'; // Show city search panel
            cityInput.focus(); // Focus on city input
        });
        countryAutocompleteList.appendChild(div);
    });
}



function showCityAutocomplete(cities) {
    cityAutocompleteList.innerHTML = ''; // Clear previous suggestions
    cities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerText = `${city.name}, ${city.country}`;
        div.addEventListener('click', () => {
            cityInput.value = `${city.name}, ${city.country}`;
            cityAutocompleteList.innerHTML = ''; // Clear suggestions after selection
        });
        cityAutocompleteList.appendChild(div);
    });
}
