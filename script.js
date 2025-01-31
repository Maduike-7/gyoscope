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

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        const alpha = event.alpha || 0;
        const beta = event.beta || 0;
        const gamma = event.gamma || 0;

        const red = Math.min(255, Math.max(0, Math.floor((alpha / 360) * 255)));
        const green = Math.min(255, Math.max(0, Math.floor((beta / 180) * 255)));
        const blue = Math.min(255, Math.max(0, Math.floor((gamma / 90) * 255)));

        document.body.style.background = `rgb(${red}, ${green}, ${blue})`;
    });
} else {
    alert("Device Orientation not supported");
}
