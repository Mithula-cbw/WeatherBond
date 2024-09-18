document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const welcomeSec = document.getElementById('welcome-sec');
        welcomeSec.style.opacity = 1;
    }, 2400);

    setTimeout(() => {
        const welcome = document.getElementById('welcome');
        welcome.remove();
        const icons = document.querySelectorAll('.icon');
        icons.forEach(entry =>{
            entry.classList.remove("hidden");
        });
        document.querySelector('.cloud-container').classList.remove('hidden');
        }, 5000);
});

const DownloadApp = document.getElementById('Download-app');
const onlineApp = document.getElementById('online-app');

DownloadApp.addEventListener("click", ()=>{
    alert("Our Android app is still in development. In the meantime, please use the online version.");

});

onlineApp.addEventListener("click", () => {
    window.location.href = "initialize.html";
});

