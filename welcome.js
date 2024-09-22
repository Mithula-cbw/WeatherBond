function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async () => {
    const content = document.getElementById('content');
    content.innerHTML = '';  // Clear content initially

    const welcomeTextMain = createElement('div', 'welcome-main');
    welcomeTextMain.innerText = `Weathering Together`;
    content.appendChild(welcomeTextMain);

    const welcomeTextSub = createElement('div', 'welcome-sub');
    welcomeTextSub.innerText = `Stay Connected, Rain or Shine`;
    content.appendChild(welcomeTextSub);

    setTimeout(() => {
        welcomeTextSub.style.opacity = 1;
    }, 2000);

    const isVisited = localStorage.getItem('isVisited') || null;

    if (!isVisited) {
        localStorage.setItem('isVisited', true);
        await showWelcomeScreen(content, welcomeTextMain, welcomeTextSub);
    } else {
        await delay(4000);
        welcomeTextMain.classList.add('mash-out');
        welcomeTextSub.classList.add('mash-out');

        setTimeout(() => {
            welcomeTextMain.remove();
            welcomeTextSub.remove();
        }, 900);
        window.location.href = "app.html";
    }
});

async function showWelcomeScreen(content, welcomeTextMain, welcomeTextSub) {
    await delay(6000);

    welcomeTextMain.classList.add('mash-out');
    welcomeTextSub.classList.add('mash-out');

    setTimeout(() => {
        welcomeTextMain.remove();
        welcomeTextSub.remove();
    }, 900);

    await delay(1000);

    const cloudText = createElement('div', 'cloud-container');
    const cloudTextDiv = createElement('div', 'cloud-text');

    const paragraph = document.createElement('p');
    const span1 = createElement('span', 'cloud-span');
    span1.innerText = "Stay Close, No Matter the Forecast.";
    const span2 = createElement('span', 'cloud-span');
    span2.innerText = "Share the Weather,";
    const span3 = createElement('span', 'cloud-span');
    span3.innerText = "Share the Love.";

    paragraph.appendChild(span1);
    paragraph.appendChild(span2);
    paragraph.appendChild(span3);
    cloudTextDiv.appendChild(paragraph);

    const callToActionDiv = createElement('div', 'call-to-action');

    const downloadBtn = createElement('button', 'btn');
    downloadBtn.id = 'Download-app';
    downloadBtn.innerText = 'Download App';

    const onlineBtn = createElement('button', 'btn');
    onlineBtn.id = 'online-app';
    onlineBtn.innerText = 'Start Online';

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.classList.add("bi", "bi-arrow-right");
    svg.setAttribute("viewBox", "0 0 16 16");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("d", "M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8");
    svg.appendChild(path);
    onlineBtn.appendChild(svg);

    callToActionDiv.appendChild(downloadBtn);
    callToActionDiv.appendChild(onlineBtn);
    cloudTextDiv.appendChild(callToActionDiv);
    cloudText.appendChild(cloudTextDiv);
    
    content.appendChild(cloudText);  // Append cloudText content

    const cloud = createElement('img', 'cloud');
    cloud.src = 'cloud.png';
    content.appendChild(cloud);

    // Attach event listeners
    downloadBtn.addEventListener("click", () => {
        console.log('btn is working');
        alert("Our Android app is still in development. In the meantime, please use the online version.");
    });

    onlineBtn.addEventListener("click", () => {
        window.location.href = "start.html";
        console.log('btn is working');
    });
}

function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content; 
    return element; 
}
