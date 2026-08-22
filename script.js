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
        bgMusic.volume = 1.0;
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
document.body.addEventListener('click', () => {
    if(bgMusic.paused) {
        bgMusic.volume = 1.0;
        bgMusic.play();
    }
}, { once: true });

// Handle clicking a level
// document.querySelectorAll('.level-hotspot').forEach(spot => {
//     spot.addEventListener('click', (e) => {
//         // Prevent the body click from triggering again
//         e.stopPropagation(); 
        
//         // 1. Get the specific files for this level
//         const visualSrc = spot.getAttribute('data-visual');
//         const voiceSrc = spot.getAttribute('data-voice');
        
//         // 2. Set the overlay visual
//         overlayVisual.src = visualSrc;
        
//         // 3. Audio management
//         bgMusic.volume = 0.2; // Drop background music to 20%
//         voiceOver.src = voiceSrc;
//         voiceOver.play();
        
//         // 4. Show the overlay
//         overlay.style.display = 'flex';
//     });
// });

// Slideshow Tracking Variables
let currentImages = [];
let currentIndex = 0;

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Handle clicking a level
document.querySelectorAll('.level-hotspot').forEach(spot => {
    spot.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        // 1. Get the files (Split the comma-separated string into an array)
        currentImages = spot.getAttribute('data-visuals').split(',');
        const voiceSrc = spot.getAttribute('data-voice');
        
        // 2. Reset to the first image in the list
        currentIndex = 0;
        overlayVisual.src = currentImages[currentIndex];
        
        // Hide arrows if there is only 1 image for this level
        const showArrows = currentImages.length > 1 ? 'block' : 'none';
        prevBtn.style.display = showArrows;
        nextBtn.style.display = showArrows;
        
        // 3. Audio management
        bgMusic.volume = 0.2;
        voiceOver.src = voiceSrc;
        voiceOver.play();
        
        // 4. Show the overlay
        overlay.style.display = 'flex';
    });
});

// Navigate Slideshow: Next Button
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stops the click from hitting the background
    // Move forward, and loop back to 0 if at the end
    currentIndex = (currentIndex + 1) % currentImages.length;
    overlayVisual.src = currentImages[currentIndex];
});

// Navigate Slideshow: Previous Button
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Move backward, and loop to the end if at the beginning
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    overlayVisual.src = currentImages[currentIndex];
});

// Handle closing the overlay
closeBtn.addEventListener('click', () => {
    // 1. Stop the voiceover
    voiceOver.pause();
    voiceOver.currentTime = 0;
    
    // 2. Bring background music back to full volume
    bgMusic.volume = 1.0;
    
    // 3. Hide the overlay
    overlay.style.display = 'none';
});

// Automatically restore background volume when the voiceover finishes playing
voiceOver.addEventListener('ended', () => {
    bgMusic.volume = 1.0;
});