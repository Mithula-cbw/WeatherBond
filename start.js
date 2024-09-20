const personOne ={
    'name':"Mithula",
    'gender':"male",
    'country': "",
    'code':'',
    'city':''
}

const personTwo ={
    'name':"",
    'gender':"female",
    'country': "",
    'code':'',
    'city':''
}

localStorage.setItem('personOne', JSON.stringify(personOne));
localStorage.setItem('personTwo', JSON.stringify(personTwo));

let nextBtnI = 0;
const apiKey = 'f90944973222ee9a70511676c51fdb77'; // Replace with your OpenWeather API key
let countryInput, cityInput, countryAutocompleteList, cityAutocompleteList;
let selectedCountryCode = '';

// n is the dot number
function sliderUpdate(n){
    const slider = document.querySelectorAll('.slide-btn');

    if (n < 1 || n > slider.length) return;

    slider.forEach((btn, index) => {
        if (index === n - 1) { 
            btn.classList.add('is-active');
        } else {
            btn.classList.remove('is-active');
        }
    });

}

function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content; 
    return element; 
}

document.addEventListener('DOMContentLoaded',()=>{
    getInfoOne();
    // setTimeout(()=>{
    //    getInfoOne();
    // },3000)
});

function getInfoOne(){
    const content = document.getElementById('content');
    sliderUpdate(1);

    const banner = `
        <img src="userImg1.webp" class="userImg animation-bottom" id="userImg" alt="">`;
    const bannerElement = createElement('div','userImg',banner);

    content.appendChild(bannerElement);

    const nameContainer = createElement('div', 'name-container');
    
    const nameLabel = createElement('label', 'name-label');
    nameLabel.setAttribute('for', 'name-input');
    nameLabel.innerText = 'What should we call you?';

    const nameInput = createElement('input', 'name-input');
    nameInput.type = 'text';
    nameInput.id = 'name-input';
    nameInput.placeholder = 'Enter your name...';

    nameInput.addEventListener('input', (event) => {
        let value = event.target.value;
        if (value) {
            event.target.value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        personOne.name = event.target.value;
    });

    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);

    content.appendChild(nameContainer);

    // //divider

    // const divider = createElement('span','divider');
    // divider.innerText ="And"
    // content.appendChild(divider);

    //gender container

    const genderContainer = createElement('div', 'name-container');
    genderContainer.id ="gender-container";

    const genderLabel = createElement('label', 'name-label');
    genderLabel.setAttribute('for', 'gender-toggle');
    genderLabel.innerText = `Your Gender is?`;

    genderToggleContainer = createElement('div');
    genderToggleContainer.id = 'gender-toggle';
    genderToggleContainer.innerHTML =`<div id="gender-toggle-btn"></div>
                <div id="gender-name"><span>MALE</span></div>
                <span id="fe-part">FE</span>
                <div id="bow"><i class="icon ion-md-bowtie"></i></div>`;

    genderContainer.appendChild(genderLabel);
    genderContainer.appendChild(genderToggleContainer);

    content.appendChild(genderContainer);


    const genderToggle= document.getElementById('gender-toggle');
    

    let isMale = true;

    genderToggle.addEventListener("click", () => {
        const genderFePart = document.getElementById('fe-part');
        const genderName = document.getElementById('gender-name');

    if (isMale) {
        // Switch to Female
       toggleToFemale();  
       personOne.gender = 'female';      
    } else {
        // Switch to Male
       toggleToMale();
       personOne.gender = 'male';
       
    }

    isMale = !isMale; // Toggle the state
    console.log(personOne.gender);

});

}   

function getInfoTwo(){
    const content = document.getElementById('content');
    sliderUpdate(3);

    const banner = `
        <img src="userImg2.webp" class="userImg animation-bottom" id="userImg" alt="">`;
    const bannerElement = createElement('div','userImg',banner);

    content.appendChild(bannerElement);

    const nameContainer = createElement('div', 'name-container');
    
    const nameLabel = createElement('label', 'name-label');
    nameLabel.setAttribute('for', 'name-input');
    nameLabel.innerText = `And what's her name?`;

    const nameInput = createElement('input', 'name-input');
    nameInput.type = 'text';
    nameInput.id = 'name-input';
    nameInput.placeholder = 'Enter her name...';

    nameInput.addEventListener('input', (event) => {
        let value = event.target.value;
        if (value) {
            event.target.value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        personTwo.name = event.target.value;
    });

    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);

    content.appendChild(nameContainer);

    // //divider

    // const divider = createElement('span','divider');
    // divider.innerText ="And"
    // content.appendChild(divider);

    //gender container

    const genderContainer = createElement('div', 'name-container');
    genderContainer.id ="gender-container";

    const genderLabel = createElement('label', 'name-label');
    genderLabel.setAttribute('for', 'gender-toggle');
    genderLabel.innerText = `Change gender:`;

    genderToggleContainer = createElement('div');
    genderToggleContainer.id = 'gender-toggle';
    genderToggleContainer.innerHTML =`<div id="gender-toggle-btn"></div>
                <div id="gender-name"><span>MALE</span></div>
                <span id="fe-part">FE</span>
                <div id="bow"><i class="icon ion-md-bowtie"></i></div>`;

    genderContainer.appendChild(genderLabel);
    genderContainer.appendChild(genderToggleContainer);

    content.appendChild(genderContainer);


    const genderToggleBtn = document.getElementById('gender-toggle-btn');
    const genderToggle = document.getElementById('gender-toggle');


let isMale = false; // Default to Female for personTwo



 const personOneInfo = JSON.parse(localStorage.getItem('personOne'));

    if (personOneInfo.gender === 'male') {
        isMale = false;
        toggleToFemale();
        personTwo.gender = 'female'
    } else {
        isMale = true;
        nameLabel.innerText = `And what's his name?`;
        nameInput.placeholder = 'Enter his name...';
        personTwo.gender = 'male';   
    }



genderToggle.addEventListener("click", () => {
    const genderFePart = document.getElementById('fe-part');
    const genderName = document.getElementById('gender-name');

    if (isMale) {
        // Switch to Female
       toggleToFemale();
       nameLabel.innerText = `And what's her name?`;
        nameInput.placeholder = 'Enter her name...';
       personTwo.gender = 'female';      
    } else {
        // Switch to Male
        toggleToMale();
        nameLabel.innerText = `And what's his name?`;
        nameInput.placeholder = 'Enter his name...';
        personTwo.gender = 'male';
    }

    isMale = !isMale; // Toggle the state for the next click
    console.log(personTwo.gender);

});  
}

function getLocationOne() {
    sliderUpdate(2);
    const content = document.getElementById('content');
    content.innerHTML = ''; 
    const body = document.querySelector('body');

    const bannerElement1 = createElement('img', 'location animation-right');
    bannerElement1.id = 'location1';
    bannerElement1.src = 'location1.PNG';
    
    const bannerElement2 = createElement('img', 'location animation-right');
    bannerElement2.id = 'location2';
    bannerElement2.src = 'location2.PNG'; 
    
    body.appendChild(bannerElement1);
    body.appendChild(bannerElement2);

    const profilePicture = document.createElement('img');
    profilePicture.src = 'profile.webp';
    profilePicture.className = 'profile-picture';
    profilePicture.alt = 'Profile Picture';
   
    const locationOneLabelContainer = createElement('div','location-one-label-container');
    const locationOneLabel = createElement('p','location-label');
    const locationOneSubLabel = createElement('p','location-sub-label');
    const profileOneNameElement = createElement('p','profileName');
    
    const profileOne = JSON.parse(localStorage.getItem('personOne'));
    const profileTwo = JSON.parse(localStorage.getItem('personTwo'));
    
    if(nextBtnI === 1){
        profileOneNameElement.innerText = `Hey, ${profileOne.name}` || '';
    } else if(nextBtnI === 3){
        profileOneNameElement.innerText = `Hey, ${profileTwo.name}` || '';
    }else{
        profileOneNameElement.innerText = '';
    }
    
    locationOneLabel.innerText = `Let's find your city`;
    locationOneSubLabel.innerText = "Please select your country first";
    locationOneSubLabel.id = 'location-sub-label';
    locationOneLabelContainer.appendChild(profilePicture);
    
    if(profileOneNameElement.innerText !== ''){
        locationOneLabelContainer.appendChild(profileOneNameElement);
    }
    locationOneLabelContainer.appendChild(locationOneLabel);
    locationOneLabelContainer.appendChild(locationOneSubLabel);
    content.appendChild(locationOneLabelContainer);

    // Country search panel
    const countryInputContainer = createElement('div','country-input-container')
    countryInput = document.createElement('input');
    countryInput.className = 'my-input';
    countryInput.id = 'country-input';
    countryInput.type = 'text';
    countryInput.placeholder = 'Search for a country...';

    countryAutocompleteList = document.createElement('div');
    countryAutocompleteList.id = 'country-autocomplete-list';
    countryAutocompleteList.className = 'autocomplete-items';

    countryInputContainer.appendChild(countryInput);
    countryInputContainer.appendChild(countryAutocompleteList);
    content.appendChild(countryInputContainer);

    // City search panel
    const cityInputContainer = createElement('div','city-input-container');
    cityInput = document.createElement('input');
    cityInput.className = 'my-input';
    cityInput.id = 'city-input';
    cityInput.type = 'text';
    cityInput.placeholder = 'Search for a city...';
    cityInput.disabled = true;

    cityAutocompleteList = document.createElement('div');
    cityAutocompleteList.id = 'city-autocomplete-list';
    cityAutocompleteList.className = 'autocomplete-items';

    cityInputContainer.appendChild(cityInput);
    cityInputContainer.appendChild(cityAutocompleteList);
    content.appendChild(cityInputContainer);

    // Event listeners
  // Event listeners
  countryInput.addEventListener('input', async (event) => {
    const query = event.target.value;

    if(countryInput.value === ''){
        cityInput.value = '';
        cityInput.disabled = true;
    }

    if (query.length > 0) { // Start searching after 1 characters
        const countries = await fetchCountries(query); // Fetch countries from API
        showCountryAutocomplete(countries);
    } else {
        countryAutocompleteList.innerHTML = ''; // Clear suggestions if query is too short
    }
});

cityInput.addEventListener('input', async (event) => {
    const query = event.target.value;
    if (query.length > 0 && selectedCountryCode) { // Check if country is selected
        const cities = await fetchCities(query, selectedCountryCode); // Fetch cities from API
        showCityAutocomplete(cities);
    } else {
        cityAutocompleteList.innerHTML = ''; // Clear suggestions if query is too short or no country is selected
    }
});
}

//main function fetch
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


//main functions for showing suggestions

let currentFocus = -1; //for key navigation

function showCountryAutocomplete(countries) {
    countryAutocompleteList.innerHTML = ''; // Clear previous suggestions
    const maxResults = 5; 

    // Loop through the countries, but only display up to 10 results
    countries.slice(0, maxResults).forEach(country => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerText = country.name;
        div.addEventListener('click', () => {
            selectedCountryCode = country.code; // Save selected country code
            countryInput.value = country.name;
            if(nextBtnI === 1){
                personOne.country = country.name;
                personOne.code = country.code;
            } else if(nextBtnI === 3){
                personTwo.country = country.name;
                personTwo.code = country.code;
            }
            countryAutocompleteList.innerHTML = ''; // Clear suggestions
           // document.querySelector('.search-panel:nth-child(2)').style.display = 'block'; // Show city search panel
            cityInput.disabled = false;

            const locSubLabel = document.getElementById('location-sub-label');

            locSubLabel.innerText = `Please enter the full name of the city`;

            cityInput.focus(); 
            // console.log(personTwo);
            console.log(selectedCountryCode);
            
        });
        countryAutocompleteList.appendChild(div);
    });

    countryInput.addEventListener('keydown', function(e) {
        const items = document.querySelectorAll('.autocomplete-item');
        if (e.key === 'ArrowDown') {
            currentFocus++;
            addActive(items);
        } else if (e.key === 'ArrowUp') {
            currentFocus--;
            addActive(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocus > -1) {
                if (items[currentFocus]) {
                    items[currentFocus].click();
                }
            }
        }
    });
}

//related functions of keydown event listner

function addActive(items) {
    if (!items) return false;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    items[currentFocus].classList.add('autocomplete-active');
}

function removeActive(items) {
    items.forEach(item => item.classList.remove('autocomplete-active'));
}

function selectCountry(country) {
    selectedCountryCode = country.code; // Save selected country code
    countryInput.value = country.name;
    countryAutocompleteList.innerHTML = ''; // Clear suggestions
    cityInput.disabled = false;
    cityInput.focus();
    console.log(`Selected Country: ${country.name}, Code: ${country.code}`);
}

function showCityAutocomplete(cities) {
    cityAutocompleteList.innerHTML = ''; // Clear previous suggestions
    cities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerText = `${city.name}, ${city.country}`;
        div.addEventListener('click', () => {
            cityInput.value = `${city.name}, ${city.country}`;
            cityAutocompleteList.innerHTML = ''; 
            if(nextBtnI === 1){
                personOne.city = city.name;
            } else if(nextBtnI === 3){
                personTwo.city = city.name;
            }
        });
        cityAutocompleteList.appendChild(div);
    });
}



//other events

const nextBtn = document.getElementById('next');

nextBtn.addEventListener("click", () => {
    
switch(nextBtnI){
    case 0:
        console.log("fist click");
        nextBtnI++;
        firstNext();
        break;
    case 1:
        console.log("sec click");
        nextBtnI++;
        SecondNext();
        break;
    case 2:
        console.log("third click");
        // ThirdNext();
        nextBtnI++;
        break;
    case 3:
        console.log("four click");
        nextBtnI++;
        break;

}
});

function firstNext(){
    if(personOne.name !== ''){
        console.log("you are good to go");
        const content = document.getElementById('content');

        //local storage
        localStorage.setItem('personOne', JSON.stringify(personOne));
        console.log(localStorage.getItem('personOne'));
        content.innerHTML='';
        content.style.animation ='slid-away-left 1s';
        
        setTimeout(()=>{
            content.style.animation = "none";
            content.offsetHeight;
            content.style.animation ='slide-in-right 1s';
        },600);
        
        setTimeout(()=>{
            getLocationOne();
        },300);
        
       
    }else{

        const nameField = document.getElementById('name-input');

        nameField.style.animation = "none";
        nameField.offsetHeight; // Trigger reflow
        nameField.style.animation = "vibrate 0.2s ";
        console.log("please fill the name");
        nextBtnI = 0;
    }
}

function SecondNext(){
    //&& personOne.city !== ''
    if(personOne.code !== ''){
        console.log("you are good to go");
        const content = document.getElementById('content');

        //local storage
        localStorage.setItem('personOne', JSON.stringify(personOne));
        console.log(localStorage.getItem('personOne'));
        content.innerHTML='';
        content.style.animation ='slid-away-left 1s';

        const locationBanners = document.querySelectorAll('.location');

        locationBanners.forEach(locale =>{
            locale.style.animation = "none";
            locale.offsetHeight;
            locale.style.animation ='slide-in-right 1s';

            setTimeout(()=>{
                locale.remove()
            },100);
        })

  
        setTimeout(()=>{
            content.style.animation = "none";
            content.offsetHeight;
            content.style.animation ='slide-in-right 1s';
        },600);
        
        setTimeout(()=>{
            getInfoTwo();
        },300);
        
    }else if(personOne.code === ''){
        const countryInputField = document.getElementById('country-input');

        countryInputField.style.animation = "none";
        countryInputField.offsetHeight; // Trigger reflow
        countryInputField.style.animation = "vibrate 0.2s ";
        console.log("please select a country");
        nextBtnI = 1;
    }else{
        const cityInputField = document.getElementById('city-input');

        cityInputField.style.animation = "none";
        cityInputField.offsetHeight; // Trigger reflow
        cityInputField.style.animation = "vibrate 0.2s ";
        console.log("please select a country");
        nextBtnI = 1;
    }
    
}

function ThirdNext(){
    if(personTwo.name !== ''){
        console.log("you are good to go");
        const content = document.getElementById('content');

        //local storage
        localStorage.setItem('personTwo', JSON.stringify(personTwo));
        console.log(localStorage.getItem('personTwo'));
        content.innerHTML='';
        content.style.animation ='slid-away-left 1s';
        
        setTimeout(()=>{
            content.style.animation = "none";
            content.offsetHeight;
            content.style.animation ='slide-in-right 1s';
        },600);
        
        setTimeout(()=>{
            getLocationOne();
        },300);
        
       
    }else{

        const nameField = document.getElementById('name-input');

        nameField.style.animation = "none";
        nameField.offsetHeight; // Trigger reflow
        nameField.style.animation = "vibrate 0.2s ";
        console.log("please fill the name");
        nextBtnI = 2;
    }
}

function toggleToFemale(){

    const genderToggle = document.getElementById('gender-toggle');
    const genderFePart = document.getElementById('fe-part');
    const genderName = document.getElementById('gender-name');

    genderName.style.animation = "none";
        genderName.offsetHeight; // Trigger reflow
        genderName.style.animation = "color-to-pink 0.2s ";
        genderName.style.right = '12px';
        genderName.style.color = 'var(--gender-pink)';

        genderToggle.style.backgroundColor ="var(--gender-bg-pink)";

        genderFePart.style.animation = "none";
        genderFePart.offsetHeight; // Trigger reflow
        genderFePart.style.animation = "fe-to-male 0.2s";
        genderFePart.style.left = '42.2px'; // Update person.gender
  
}

function toggleToMale(){
    const genderToggle = document.getElementById('gender-toggle');
    const genderFePart = document.getElementById('fe-part');
    const genderName = document.getElementById('gender-name');


    genderName.style.animation = "none";
        genderName.offsetHeight; // Trigger reflow
        genderName.style.animation = "color-to-blue 0.2s";
        genderName.style.right = '20px';
        genderName.style.color = 'var(--gender-blue)';

        genderToggle.style.backgroundColor ="var(--gender-bg-blue)";

        genderFePart.style.animation = "none";
        genderFePart.offsetHeight; // Trigger reflow
        genderFePart.style.animation = "male-to-fe 0.2s";
        genderFePart.style.left = '10px'; // Update person.gender
    
}