// Register the Scroll plugin
gsap.registerPlugin(ScrollTrigger);

// Start background music on first interaction (browsers block autoplay)
document.body.addEventListener('click', () => {
    const bgMusic = document.getElementById('bg-music');
    if(bgMusic.paused) bgMusic.play();
}, { once: true });

// Make the car subtlely bob up and down like it's hovering/driving
gsap.to("#player", {
    y: 15,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
});

// Interactive Nodes: Show media when clicked
const nodes = document.querySelectorAll('.level-node');
nodes.forEach(node => {
    node.addEventListener('click', () => {
        // Hide all other media first
        document.querySelectorAll('.milestone-media').forEach(media => media.style.display = 'none');
        
        // Show this node's media
        const media = node.querySelector('.milestone-media');
        if (media) media.style.display = 'block';
    });
});