// Countdown to Panda's birthday
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let birthday = new Date(currentYear, 5, 15); // June is month 5 (0-indexed)
    
    // If birthday has passed this year, use next year's date
    if (now > birthday) {
        birthday = new Date(currentYear + 1, 5, 15);
    }
    
    const diff = birthday - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').innerHTML = `
        ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until Panda's Birthday!
    `;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Birthday wishes functionality
document.getElementById('addWish').addEventListener('click', function() {
    const wishText = document.getElementById('wishText').value.trim();
    if (wishText) {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish';
        wishElement.innerHTML = `
            <p><strong>New Wish:</strong> ${wishText}</p>
            <small>Added on ${new Date().toLocaleString()}</small>
            <hr>
        `;
        document.getElementById('wishList').prepend(wishElement);
        document.getElementById('wishText').value = '';
        
        // Show a little celebration
        createConfetti();
    }
});

// Confetti effect
function createConfetti() {
  const confettiContainer = document.getElementById('confetti');
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    
    // Random positioning and animation
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.opacity = Math.random() * 0.5 + 0.5;
    
    // Random rotation
    const rotation = Math.random() * 360;
    confetti.style.transform = `rotate(${rotation}deg)`;
    
    confettiContainer.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

/* === MUSIC TOGGLE (panda button) === */
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('birthdayMusic');
    const btn = document.getElementById('musicToggle');
    
    // Try to play automatically (will work if user has interacted with page before)
    const playPromise = audio.play();
    
    // Handle autoplay restrictions
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Autoplay was prevented, show visual cue
            btn.classList.add('muted');
            console.log("Autoplay prevented, waiting for user interaction");
        });
    }
    
    // Setup toggle functionality
    btn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                btn.classList.remove('muted');
            }).catch(error => {
                console.log("Playback failed:", error);
            });
        } else {
            audio.pause();
            btn.classList.add('muted');
        }
    });
});




// Add CSS for confetti animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Special effect on page load
window.addEventListener('load', function() {
    createConfetti();
});

// Enhanced Loading Screen Functionality
window.addEventListener('load', function() {
  // Animate progress bar
  const progressBar = document.querySelector('.progress-bar');
  let progress = 0;
  const progressInterval = setInterval(function() {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      
      // Complete loading sequence
      setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        
        // Remove loading screen after fade out
        setTimeout(function() {
          loadingScreen.remove();
          
          // Trigger celebration effects
          createConfetti();
          
          // Play birthday music if not already playing
          const audio = document.getElementById('birthdayMusic');
          if (audio.paused) {
            audio.muted = false;
            audio.play().catch(e => console.log("Autoplay blocked:", e));
          }
        }, 800);
      }, 500);
    }
    progressBar.style.width = `${progress}%`;
  }, 150);
});

// Create floating hearts
function createHearts() {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;
    heart.style.width = `${10 + Math.random() * 20}px`;
    heart.style.height = heart.style.width;
    heart.style.animationDelay = `${Math.random() * 10}s`;
    document.body.appendChild(heart);
  }
}

window.addEventListener('load', createHearts);

// Create floating balloons
function createBalloons() {
  const colors = ['#ff85a2', '#ffb6c1', '#ffd700', '#87cefa', '#98fb98'];
  const balloonContainer = document.createElement('div');
  balloonContainer.className = 'balloon-container';
  document.body.appendChild(balloonContainer);

  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.width = `${40 + Math.random() * 40}px`;
    balloon.style.height = `${50 + Math.random() * 50}px`;
    balloon.style.animationDuration = `${15 + Math.random() * 15}s`;
    balloon.style.animationDelay = `${Math.random() * 5}s`;
    balloonContainer.appendChild(balloon);
  }
}

// Call this in your window load event
createBalloons();

// Typing animation for header
function typeWriter() {
  const title = document.querySelector('h1');
  const originalText = title.textContent;
  title.textContent = '';
  
  let i = 0;
  const typing = setInterval(() => {
    if (i < originalText.length) {
      title.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 100);
}

// Call this after your loading screen completes
setTimeout(typeWriter, 800);


function typeWriter() {
  const title = document.querySelector('h1');
  const originalText = title.textContent.trim();
  title.textContent = '';
  title.style.visibility = 'visible'; // Ensure it's visible
  
  let i = 0;
  const typing = setInterval(() => {
    if (i < originalText.length) {
      title.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 100);
}

// Call this after loading screen completes
setTimeout(typeWriter, 800);

// Gift box functionality
document.getElementById('giftBox').addEventListener('click', function() {
  const giftBox = this;
  
  // Only animate if not already open
  if (!giftBox.classList.contains('open')) {
    giftBox.classList.add('open');
    
    // Create sparkles
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${50 + (Math.random() - 0.5) * 80}%`;
        sparkle.style.top = `${50 + (Math.random() - 0.5) * 80}%`;
        sparkle.style.animationDelay = `${i * 0.05}s`;
        giftBox.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => sparkle.remove(), 1000);
      }, i * 50);
    }
    
    // Update message
    setTimeout(() => {
      document.querySelector('.gift-message').textContent = 
        "Your gift is our love and best wishes! 💖";
    }, 1000);
  }
});

