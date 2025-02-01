function getDeviceIcon() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) {
        document.getElementById('icon').className = 'fas fa-mobile-alt';
        document.getElementById('icon').style.fontSize = '50px';
    } else if (/tablet/i.test(ua)) {
        document.getElementById('icon').className = 'fas fa-tablet-alt';
        document.getElementById('icon').style.fontSize = '75px';
    } else {
        document.getElementById('icon').className = 'fas fa-laptop';
        document.getElementById('icon').style.fontSize = '100px';
    }
}

function getDeviceInfo() {
    const ua = navigator.userAgent;
    let device = 'Desktop';
    if (/mobile/i.test(ua)) {
        device = 'Mobile';
    } else if (/tablet/i.test(ua)) {
        device = 'Tablet';
    }
    return device;
}

function getDetailedDeviceInfo() {
    const ua = navigator.userAgent;
    return ua;
}

getDeviceIcon();
const deviceInfoElement = document.getElementById('device-info');
const detailedInfoElement = document.getElementById('detailed-info');
deviceInfoElement.innerText = `${getDeviceInfo()} - Tap for more detail`;

deviceInfoElement.addEventListener('click', function() {
    detailedInfoElement.innerText = getDetailedDeviceInfo();
    detailedInfoElement.style.display = 'block';
    detailedInfoElement.style.opacity = '1';
    detailedInfoElement.style.transform = 'translateX(-50%) translateY(10px)';
    document.getElementById('icon').style.animation = 'bounce 2s infinite, fadeInOut 2s infinite, hover 2s infinite';
    setTimeout(() => {
        detailedInfoElement.style.opacity = '0';
        detailedInfoElement.style.transform = 'translateX(-50%) translateY(0)';
        setTimeout(() => {
            detailedInfoElement.style.display = 'none';
            document.getElementById('icon').style.animation = '';
        }, 1000);
    }, 5000);
});

// Add a water-like background image
document.body.style.backgroundImage = 'url("path/to/water-texture.jpg")';
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.transition = 'background-position 0.1s ease-out';

let lastGamma = 0;
let lastBeta = 0;
let momentumX = 0;
let momentumY = 0;
let shakeIntensityX = 0;
let shakeIntensityY = 0;
let vibrationX = 0;
let vibrationY = 0;

// Load water sound effect
const waterSound = new Audio('path/to/water-sound.mp3');
waterSound.loop = true;
waterSound.volume = 0.5; // Adjust volume as needed

// Load vibration sound effect
const vibrationSound = new Audio('path/to/vibration-sound.mp3');
vibrationSound.loop = true;
vibrationSound.volume = 0.5; // Adjust volume as needed

// Function to update background position based on device orientation
function updateBackgroundPosition(alpha, beta, gamma) {
    const x = Math.min(50, Math.max(-50, gamma)) * 2; // Adjust sensitivity as needed
    const y = Math.min(50, Math.max(-50, beta)) * 2;  // Adjust sensitivity as needed

    momentumX += (x - lastGamma) * 0.2; // Increase momentum factor for heavier feel
    momentumY += (y - lastBeta) * 0.2;  // Increase momentum factor for heavier feel

    shakeIntensityX *= 0.8; // Dampen the shake effect over time
    shakeIntensityY *= 0.8; // Dampen the shake effect over time

    vibrationX = Math.sin(Date.now() / 30) * shakeIntensityX; // Increase vibration effect
    vibrationY = Math.sin(Date.now() / 30) * shakeIntensityY; // Increase vibration effect

    document.body.style.backgroundPosition = `${x + momentumX + vibrationX}% ${y + momentumY + vibrationY}%`;

    lastGamma = gamma;
    lastBeta = beta;
}

function handleOrientation(event) {
    const alpha = event.alpha || 0;
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;

    const red = Math.min(255, Math.max(0, Math.floor((alpha / 360) * 255)));
    const green = Math.min(255, Math.max(0, Math.floor((beta / 180) * 255)));
    const blue = Math.min(255, Math.max(0, Math.floor((gamma / 90) * 255)));

    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    // Update background position to create a water-like effect
    updateBackgroundPosition(alpha, beta, gamma);
}

function handleShake(event) {
    const acceleration = event.accelerationIncludingGravity;
    shakeIntensityX = acceleration.x * 3; // Increase shake sensitivity for heavier feel
    shakeIntensityY = acceleration.y * 3; // Increase shake sensitivity for heavier feel

    // Play water sound effect on shake
    if (!waterSound.paused) {
        waterSound.currentTime = 0; // Restart sound if already playing
    } else {
        waterSound.play();
    }

    // Play vibration sound effect on shake
    if (!vibrationSound.paused) {
        vibrationSound.currentTime = 0; // Restart sound if already playing
    } else {
        vibrationSound.play();
    }
}

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
} else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function(event) {
        const acceleration = event.accelerationIncludingGravity;
        const alpha = acceleration.x || 0;
        const beta = acceleration.y || 0;
        const gamma = acceleration.z || 0;

        handleOrientation({ alpha, beta, gamma });
        handleShake(event);
    });
} else {
    alert("Device Orientation not supported");
}
