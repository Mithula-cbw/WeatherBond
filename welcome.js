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
        }, 4500);
});
