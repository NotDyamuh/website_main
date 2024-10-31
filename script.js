const customCursor = document.getElementById('customCursor');
const rainCanvas = document.getElementById('rainCanvas');
const ctx = rainCanvas.getContext('2d');
rainCanvas.width = window.innerWidth;
rainCanvas.height = window.innerHeight;
let raindrops = [];

// Create raindrops
for (let i = 0; i < 100; i++) {
    raindrops.push({
        x: Math.random() * rainCanvas.width,
        y: Math.random() * rainCanvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1 // Slower speed
    });
}

function drawRain() {
    ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    for (let drop of raindrops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
        drop.y += drop.speed; // Move raindrop down
        if (drop.y > rainCanvas.height) {
            drop.y = -drop.length; // Reset to just above the top
            drop.x = Math.random() * rainCanvas.width; // Random horizontal position
        }
    }
}

// Draw rain at a slower interval
setInterval(drawRain, 33); // About 30 frames per second

// Custom cursor movement
document.addEventListener('mousemove', (e) => {
    customCursor.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`; // Center the cursor
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
});

// Handle audio playback
const audio = document.getElementById('backgroundAudio');
const audioModal = document.getElementById('audioModal');

const tracks = [
    'watch_the_party_die.mp3', // Current track
    'another_track.mp3', // Placeholder for additional tracks
    'yet_another_track.mp3' // Another placeholder
];

let currentTrackIndex = 0;

audioModal.addEventListener('click', () => {
    audio.play().then(() => {
        audioModal.style.display = 'none'; // Hide modal if audio starts
    }).catch(error => {
        console.error('Audio playback failed:', error);
    });
});

// Show the modal on page load
window.addEventListener('load', () => {
    audioModal.style.display = 'flex'; // Show modal
});

// Play the current track
function playTrack(index) {
    audio.src = tracks[index];
    audio.play();
}

// Control buttons
const prevButton = document.getElementById('prevButton');
const pauseButton = document.getElementById('pauseButton');
const skipButton = document.getElementById('skipButton');

pauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        pauseButton.textContent = 'Pause'; // Change button text to 'Pause'
    } else {
        audio.pause();
        pauseButton.textContent = 'Play'; // Change button text to 'Play'
    }
});

prevButton.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
        playTrack(currentTrackIndex);
    }
});

skipButton.addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
        playTrack(currentTrackIndex);
    }
});

// Redirect with fade-out effect
document.getElementById('middleButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of the anchor
    const targetUrl = this.href; // Get the URL to redirect to

    // Add the fade-out class to the content
    document.querySelector('.content').classList.add('fade-out');

    // Wait for the transition to complete before redirecting
    setTimeout(() => {
        window.location.href = targetUrl; // Redirect
    }, 500); // Match the CSS transition duration
});
