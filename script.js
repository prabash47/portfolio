const contactBtn = document.getElementById('contactBtn');
const welcomeText = document.querySelector('.welcome');
const typedText = document.getElementById('typed-text');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('musicToggle');

contactBtn.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

const currentHour = new Date().getHours();
if (currentHour < 12) {
    welcomeText.textContent = "Good Morning!";
} else if (currentHour < 18) {
    welcomeText.textContent = "Good Afternoon!";
} else {
    welcomeText.textContent = "Good Evening!";
}

const descriptionText = "I am an undergraduate student with a strong interest in web development and software technologies. My career goal is to become a skilled web developer and contribute to modern digital solutions.";
let charIndex = 0;

function typeEffect() {
    if (charIndex < descriptionText.length) {
        typedText.textContent += descriptionText.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 30);
    }
}
typeEffect();

const handleInitialPlay = () => {
    bgMusic.play().catch(() => {});
    musicToggle.textContent = "⏸️";
    document.removeEventListener('click', handleInitialPlay);
};

document.addEventListener('click', handleInitialPlay);

musicToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = "⏸️";
    } else {
        bgMusic.pause();
        musicToggle.textContent = "▶️";
    }
});


async function loadCloudinaryGallery() {
    const response = await fetch("data/gallery.json");
    const images = await response.json();

    const gallery = document.getElementById("cloudinary-gallery");

    gallery.innerHTML = images.map(image => `
        <img
            src="${image.url}"
            alt="Portfolio project"
            loading="lazy"
        >
    `).join("");
}

loadCloudinaryGallery();
