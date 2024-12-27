// Carousel Functionality
document.querySelectorAll('.carousel-container').forEach(container => {
    const carousel = container.querySelector('.carousel');
    const leftBtn = container.querySelector('.left');
    const rightBtn = container.querySelector('.right');

    // Scroll Left
    leftBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });

    // Scroll Right
    rightBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Auto Scroll every 3 seconds
    setInterval(() => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    }, 3000);
});

// Live Search Functionality
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    if (query.length > 2) {
        const results = await fetchSearchResults(query);
        displaySearchResults(results);
    } else {
        searchResults.innerHTML = '';
    }
});

async function fetchSearchResults(query) {
    try {
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
}

function displaySearchResults(results) {
    searchResults.innerHTML = results.map(result => `
        <div class="search-item">
            <img src="${result.thumbnail}" alt="${result.title}">
            <span>${result.title}</span>
        </div>
    `).join('');
}

// Video Player Controls
const video = document.querySelector('video');
const playButton = document.querySelector('.play-pause');
const volumeControl = document.querySelector('.volume');
const fullScreenBtn = document.querySelector('.fullscreen');

// Play/Pause Video
playButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playButton.textContent = 'Pause';
    } else {
        video.pause();
        playButton.textContent = 'Play';
    }
});

// Volume Control
volumeControl.addEventListener('input', (e) => {
    video.volume = e.target.value;
});

// Fullscreen Toggle
fullScreenBtn.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { // Safari Support
        video.webkitRequestFullscreen();
    }
});

// Continue Watching - Save Video Time in Local Storage
video.addEventListener('timeupdate', () => {
    localStorage.setItem('lastWatchedTime', video.currentTime);
});

// Load Last Watched Time
window.addEventListener('load', () => {
    const lastWatchedTime = localStorage.getItem('lastWatchedTime');
    if (lastWatchedTime) {
        video.currentTime = lastWatchedTime;
    }
});

// Responsive Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Highlight Active Menu Item
document.addEventListener("DOMContentLoaded", () => {
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.navbar a');

    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add("active");
        }
    });
});
// Responsive Menu Toggle
const menutoggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
