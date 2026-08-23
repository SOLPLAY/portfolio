const bgMusic = document.getElementById('bg-music');
const voiceOver = document.getElementById('voice-over');
const overlay = document.getElementById('story-overlay');
const overlayVisual = document.getElementById('overlay-visual');
const closeBtn = document.getElementById('close-btn');
// Start music and hide the start screen when the 'OK' image is clicked
const startScreen = document.getElementById('start-screen');
const okBtnImg = document.getElementById('ok-btn-img');

okBtnImg.addEventListener('click', () => {
    // 1. Start the ambient audio
    if (bgMusic.paused) {
        bgMusic.volume = 0.3;
        bgMusic.play();
    }
    
    // 2. Fade out the black screen
    startScreen.style.opacity = '0';
    
    // 3. Remove it from the HTML flow after the 1-second fade finishes
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1000);
});

// Start background music on first click anywhere on the page
// document.body.addEventListener('click', () => {
//     if(bgMusic.paused) {
//         bgMusic.volume = 1.0;
//         bgMusic.play();
//     }
// }, { once: true });

//Handle clicking a level
document.querySelectorAll('.level-hotspot').forEach(spot => {
    spot.addEventListener('click', (e) => {
        // Prevent the body click from triggering again
        e.stopPropagation(); 
        
        // 1. Get the specific files for this level
        const visualSrc = spot.getAttribute('data-visual');
        const voiceSrc = spot.getAttribute('data-voice');
        
        // 2. Set the overlay visual
        overlayVisual.src = visualSrc;
        
        // 3. Audio management
        bgMusic.volume = 0.2; // Drop background music to 20%
        voiceOver.src = voiceSrc;
        voiceOver.play();
        
        // 4. Show the overlay
        overlay.style.display = 'flex';
    });
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
        
        // 3. Audio management
        bgMusic.volume = 0.05;  // Drop ambient music to just 5% so it's a whisper
        voiceOver.volume = 1.0; // Force voiceover to 100% maximum volume
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

// Important: Stop video when overlay is closed
closeBtn.addEventListener('click', () => {
    voiceOver.pause();
    voiceOver.currentTime = 0;
    bgMusic.volume = 0.3;
    overlay.style.display = 'none';
    
    // Stop the video so it doesn't keep playing in the background
    overlayVideo.pause();
});