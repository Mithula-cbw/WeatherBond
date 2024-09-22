const personOne = {
    'name': "",
    'gender': "male",
    'country': "",
    'city': '',
    'longitude': null,
    'latitude': null
};

const personTwo = {
    'name': "",
    'gender': "female",
    'country': "",
    'city': '',
    'longitude': null,
    'latitude': null
};


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
    const content = document.getElementById('content');
    content.innerHTML = ''; 

    const profilePicture = document.createElement('img');
    profilePicture.src = 'profile.webp';
    profilePicture.className = 'profile-picture';
    profilePicture.alt = 'Profile Picture';

    const locationOneLabelContainer = createElement('div', 'location-one-label-container');
    const locationOneLabel = createElement('p', 'location-label');
    const locationOneSubLabel = createElement('p', 'location-sub-label');
    locationOneSubLabel.id = 'location-sub-label';

    const profileOneNameElement = createElement('p', 'profileName');
    const profileOne = JSON.parse(localStorage.getItem('personOne'));
    const profileTwo = JSON.parse(localStorage.getItem('personTwo'));
    
    if (nextBtnI === 1) {
        sliderUpdate(2);
        profileOneNameElement.innerText = `Hey, ${profileOne.name}` || '';
        locationOneLabel.innerText = `Let's find your city`;
        locationOneSubLabel.innerText = "Please select your location";     
    } else if (nextBtnI === 3) {
        sliderUpdate(4);
        if (profileTwo.gender === 'male') {
            locationOneLabel.innerText = `Let's find his city`;
            locationOneSubLabel.innerText = "Please select his country first";
        } else {
            locationOneLabel.innerText = `Let's find her city`;
            locationOneSubLabel.innerText = "Please select her country first";
        }
        profileOneNameElement.innerText = `${profileTwo.name}` || '';
    } else {
        profileOneNameElement.innerText = '';
    }
    
    
    locationOneLabelContainer.appendChild(profilePicture);
    
    if (profileOneNameElement.innerText !== '') {
        locationOneLabelContainer.appendChild(profileOneNameElement);
    }
    locationOneLabelContainer.appendChild(locationOneLabel);
    locationOneLabelContainer.appendChild(locationOneSubLabel);
    content.appendChild(locationOneLabelContainer);

    // Add the map container
    const mapContainer = createElement('div', 'map');
    mapContainer.id = 'map';
    content.appendChild(mapContainer);

    // Initialize the Mapbox map
    mapboxgl.accessToken = 'pk.eyJ1IjoibWl0aHVsYS1jYnciLCJhIjoiY20xYm4zc2p2MXp3OTJsc2pmMnJkbnJ4NCJ9.ojNa7HQQPAeRsnBcwzCbWA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [2.3522, 48.8566],
        zoom: 9
    });

    const markerElement = createElement('div','marker');
    markerElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
        </svg>
    `;
    const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([2.3522, 48.8566])
        .addTo(map);

    const inputContainer = createElement('div', 'input-container');
    const searchInputContainer = createElement('div', 'search-input-container');
    const searchInput = document.createElement('input');
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search for places...';
    searchInputContainer.appendChild(searchInput);
    inputContainer.appendChild(searchInputContainer);
    content.insertBefore(inputContainer, mapContainer); // Place above the map

    // Create a container for autocomplete suggestions
    const autocompleteList = document.createElement('div');
    autocompleteList.className = 'autocomplete-list';
    searchInputContainer.appendChild(autocompleteList);
    inputContainer.appendChild(searchInputContainer); // Append input container to the content

    // Event listener for searching
    searchInput.addEventListener('input', async (event) => {
        const query = event.target.value;
        autocompleteList.innerHTML = ''; // Clear previous suggestions

        if (query.length > 1) {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`);
            const data = await response.json();

            const suggestions = data.features.slice(0, 5); // Limit to 5 suggestions

            if (suggestions.length > 0) {
                suggestions.forEach(feature => {
                    const suggestion = document.createElement('div');
                    suggestion.className = 'autocomplete-item';
                    suggestion.innerText = feature.place_name;

                    // Add click event to the suggestion
                    suggestion.addEventListener('click', () => {
                        const [longitude, latitude] = feature.center;
                        marker.setLngLat([longitude, latitude]);
                        map.flyTo({ center: [longitude, latitude], zoom: 13 });
                        searchInput.value = feature.place_name; // Set input to selected place
                        autocompleteList.innerHTML = ''; // Clear suggestions after selection

                        // Update personOne with selected location
                        const selectedCountry = feature.context.find(ctx => ctx.id.includes('country'));
                        const selectedCity = feature.context.find(ctx => ctx.id.includes('place'));

                        if (nextBtnI === 1) {
                            personOne.country = selectedCountry ? selectedCountry.text : '';
                            personOne.city = selectedCity ? selectedCity.text : '';
                            personOne.longitude = longitude;
                            personOne.latitude = latitude;
    
                            // Save updated personOne object to local storage
                            localStorage.setItem('personOne', JSON.stringify(personOne));   
                        } else if (nextBtnI === 3) {
                            personTwo.country = selectedCountry ? selectedCountry.text : '';
                            personTwo.city = selectedCity ? selectedCity.text : '';
                            personTwo.longitude = longitude;
                            personTwo.latitude = latitude;
    
                            // Save updated personTwo object to local storage
                            localStorage.setItem('personTwo', JSON.stringify(personTwo));
                        }  
                    });

                    autocompleteList.appendChild(suggestion);
                });
            }
        }
    });

    // Geolocator button
    const geolocateButton = document.createElement('div');
    geolocateButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-crosshair" viewBox="0 0 16 16">
      <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
    </svg>`;
    geolocateButton.className = 'geolocate-button';
    inputContainer.appendChild(geolocateButton);

    geolocateButton.addEventListener('click', async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
    
                marker.setLngLat([longitude, latitude]);
                map.flyTo({ center: [longitude, latitude], zoom: 13 });
    
                console.log('Current Location:', { longitude, latitude });
    
                // Reverse geocode to get place name
                const reverseGeocodeResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`);
                const reverseGeocodeData = await reverseGeocodeResponse.json();
                const place = reverseGeocodeData.features[0]; // Get the first result
    
                // Update the input box with the place name
                if (place) {
                    searchInput.value = place.place_name;
    
                    // Update personOne or personTwo with the current location
                    const selectedCountry = place.context.find(ctx => ctx.id.includes('country'));
                    const selectedCity = place.context.find(ctx => ctx.id.includes('place'));
    
                    if (nextBtnI === 1) {
                        personOne.country = selectedCountry ? selectedCountry.text : '';
                        personOne.city = selectedCity ? selectedCity.text : '';
                        personOne.longitude = longitude;
                        personOne.latitude = latitude;
    
                        // Save updated personOne object to local storage
                        localStorage.setItem('personOne', JSON.stringify(personOne));
                    } else if (nextBtnI === 3) {
                        personTwo.country = selectedCountry ? selectedCountry.text : '';
                        personTwo.city = selectedCity ? selectedCity.text : '';
                        personTwo.longitude = longitude;
                        personTwo.latitude = latitude;
    
                        // Save updated personTwo object to local storage
                        localStorage.setItem('personTwo', JSON.stringify(personTwo));
                    }
                }
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    });

    // Event listener when the marker is dragged
    marker.on('dragend', function() {
        const lngLat = marker.getLngLat();
        console.log('Marker moved to:', lngLat);

        if(nextBtnI === 1){
            personOne.longitude = lngLat.lng;
            personOne.latitude = lngLat.lat;

            // Save updated personOne object to local storage
            localStorage.setItem('personOne', JSON.stringify(personOne));
        }else if(nextBtnI === 3)
            personTwo.longitude = lngLat.lng;
            personTwo.latitude = lngLat.lat;

            // Save updated personTwo object to local storage
            localStorage.setItem('personTwo', JSON.stringify(personTwo));
    });
}


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
        nextBtnI++;
        ThirdNext();        
        break;
    case 3:
        console.log("four click");
        nextBtnI++;
        sliderUpdate(5);
        forthNext();
        break;
    case 4:
        window.location.href = "app.html";
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
    if(personOne.latitude){
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
        
    }else{
        const countryInputField = document.querySelector('.search-input');

        countryInputField.style.animation = "none";
        countryInputField.offsetHeight; // Trigger reflow
        countryInputField.style.animation = "vibrate 0.2s ";
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

function forthNext(){
    if(personOne.latitude){
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
            const title = document.getElementById('title');
        title.innerText = 'You are good to go!';

        const subTitle = document.getElementById('sub-title');
        subTitle.innerText = 'Thank you for being patient.';
        content.style.justifyContent = 'flex-start';
        const tempInfo = createElement('div', 'temp-div');
        tempInfo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                            </svg>`;
content.appendChild(tempInfo);
        const nextBtnR = document.getElementById('next');
        nextBtnR.style.backgroundColor='hsl(120, 75%, 50%)';
        const tempPerson = createElement('div','temp-person');

        const tempOne = createElement('p', null); // Changed to match casing
        const tempTwo = createElement('p', null); // Changed to match casing
        
        tempOne.innerText = 'Your journey together just got a little brighter!';
        tempOne.id = 'temp1';
        tempPerson.appendChild(tempOne);
        
        tempTwo.innerText = 'stay in sync with the weather, no matter the distance!';
        tempTwo.id = 'temp2';
        tempPerson.appendChild(tempTwo);
        content.appendChild(tempPerson);
        },1000);
        
       
    }else{

        const nameField = document.querySelector('.search-input');

        nameField.style.animation = "none";
        nameField.offsetHeight; // Trigger reflow
        nameField.style.animation = "vibrate 0.2s ";
        console.log("please fill the name");
        nextBtnI = 3;
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