const bgMusic = document.getElementById('bg-music');
const voiceOver = document.getElementById('voice-over');
const overlay = document.getElementById('story-overlay');
const closeBtn = document.getElementById('close-btn');

// Start music and hide the start screen when the 'OK' image is clicked
const startScreen = document.getElementById('start-screen');
const okBtnImg = document.getElementById('ok-btn-img');

okBtnImg.addEventListener('click', () => {
    // 1. Start the ambient audio
    if (bgMusic.paused) {
        bgMusic.volume = 0.025;
        bgMusic.play();
    }
    
    // 2. Fade out the black screen
    startScreen.style.opacity = '0';
    
    // 3. Remove it from the HTML flow after the 1-second fade finishes
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1000);
});

// Slideshow Tracking Variables
let currentImages = [];
let currentIndex = 0;

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const overlayImg = document.getElementById('overlay-img');
const overlayVideo = document.getElementById('overlay-video');

// Helper function to switch between image and video
function updateMediaDisplay(fileSrc) {
    // Check if the file is a video
    if (fileSrc.endsWith('.mp4') || fileSrc.endsWith('.webm')) {
        overlayImg.style.display = 'none';           // Hide image
        overlayVideo.style.display = 'block';        // Show video
        overlayVideo.src = fileSrc;
        overlayVideo.play();
    } else {
        // It must be an image
        overlayVideo.style.display = 'none';         // Hide video
        overlayVideo.pause();                        // Stop video audio/playback
        overlayImg.style.display = 'block';          // Show image
        overlayImg.src = fileSrc;
    }
}

// Handle clicking a level
document.querySelectorAll('.level-hotspot').forEach(spot => {
    spot.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        currentImages = spot.getAttribute('data-visuals').split(',');
        const voiceSrc = spot.getAttribute('data-voice');
        
        // Load the first piece of media
        currentIndex = 0;
        updateMediaDisplay(currentImages[currentIndex]);
        
        const showArrows = currentImages.length > 1 ? 'block' : 'none';
        prevBtn.style.display = showArrows;
        nextBtn.style.display = showArrows;
        
        // Audio management
        bgMusic.volume = 0.018;  // Drop ambient music so it's a whisper
        voiceOver.volume = 1.0; // MAX volume is 1.0
        voiceOver.src = voiceSrc;
        voiceOver.play();
        
        overlay.style.display = 'flex';
    });
});

// Navigate Slideshow: Next
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateMediaDisplay(currentImages[currentIndex]);
});

// Navigate Slideshow: Previous
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateMediaDisplay(currentImages[currentIndex]);
});

// Important: Stop video and voice when overlay is closed
closeBtn.addEventListener('click', () => {
    voiceOver.pause();
    voiceOver.currentTime = 0;
    bgMusic.volume = 0.02; // Bring background music back up
    overlay.style.display = 'none';
    
    // Stop the video so it doesn't keep playing in the background
    overlayVideo.pause();
});

// Automatically restore background volume when the voiceover finishes playing
voiceOver.addEventListener('ended', () => {
    bgMusic.volume = 0.02;
});