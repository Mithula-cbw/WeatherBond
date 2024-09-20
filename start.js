const personOne ={
    'name':"",
    'gender':"male",
    'location': ""
}

const personTwo ={
    'name':"",
    'gender':"female",
    'location': ""
}

localStorage.setItem('personOne', JSON.stringify(personOne));
localStorage.setItem('personTwo', JSON.stringify(personTwo));

let nextBtnI = 0;

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


    const genderToggleBtn = document.getElementById('gender-toggle-btn');
    

    let isMale = true;

    genderToggleBtn.addEventListener("click", () => {
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



genderToggleBtn.addEventListener("click", () => {
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

        content.style.animation ='slid-away-left 1s';
        content.innerHTML='';
        setTimeout(()=>{
            getInfoTwo();
        },1500);
        
       
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
    if(personTwo.name !== ''){
        console.log("you are good to go");
        const content = document.getElementById('content');

        //local storage
        localStorage.setItem('personTwo', JSON.stringify(personTwo));
        console.log(localStorage.getItem('personTwo'));

        content.style.animation ='slid-away-left 1.5s';
        content.innerHTML='';
    }else{

        const nameField = document.getElementById('name-input');

        nameField.style.animation = "none";
        nameField.offsetHeight; // Trigger reflow
        nameField.style.animation = "vibrate 0.2s ";
        console.log("please fill the name");
        nextBtnI = 1;
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