const dot = document.getElementById("pointer-dot");
const ring = document.getElementById("pointer-ring");
const particleContainer = document.createElement("div");
document.body.appendChild(particleContainer);

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
const speed = 0.15;

// Trail setup
const trailLength = 20;
const trailDots = [];
for (let i = 0; i < trailLength; i++) {
    const tdot = document.createElement('div');
    tdot.className = 'trail-dot';
    document.body.appendChild(tdot);
    trailDots.push({ el: tdot, x: 0, y: 0 });
}

// Track mouse
document.addEventListener("mousemove", e => { mouseX = e.clientX; mouseY = e.clientY; });

// Adaptive color based on background
function updateCursorColor(x, y) {
    const elem = document.elementFromPoint(x, y);
    if (!elem) return;
    const bg = getComputedStyle(elem).backgroundColor;
    const rgb = bg.match(/\d+/g);
    if (!rgb) return;
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;

    if (brightness > 180) {
        // Light background
        dot.style.background = "radial-gradient(circle, #222 0%, rgba(0,0,0,0.2) 60%)";
        dot.style.boxShadow = "0 0 12px #222, 0 0 25px #ff00ff, 0 0 50px #ff00ff";
        ring.style.background = "radial-gradient(circle, rgba(255,0,255,0.3), rgba(255,0,255,0))";
    } else {
        // Dark background
        dot.style.background = "radial-gradient(circle, #fff 0%, rgba(255,255,255,0.2) 60%)";
        dot.style.boxShadow = "0 0 12px #fff, 0 0 25px #ff00ff, 0 0 50px #ff00ff";
        ring.style.background = "radial-gradient(circle, rgba(255,0,255,0.5), rgba(255,0,255,0))";
    }
}

// Smooth cursor + trail
function animateCursor() {
    dotX += (mouseX - dotX) * speed;
    dotY += (mouseY - dotY) * speed;
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    ring.style.left = dotX + 'px';
    ring.style.top = dotY + 'px';

    // Update adaptive color
    updateCursorColor(dotX, dotY);

    // Update trail
    let prevX = dotX, prevY = dotY;
    trailDots.forEach((t, i) => {
        t.x += (prevX - t.x) * 0.3;
        t.y += (prevY - t.y) * 0.3;
        t.el.style.left = t.x + 'px';
        t.el.style.top = t.y + 'px';
        t.el.style.opacity = 0.6 * (1 - i / trailLength);
        const hue = (i * 18 + performance.now() * 0.05) % 360; // rainbow gradient
        t.el.style.background = `radial-gradient(circle, hsl(${hue},100%,80%) 0%, hsl(${hue},100%,60%) 50%, hsl(${hue},100%,40%) 100%)`;
        prevX = t.x; prevY = t.y;
    });

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Create dense smoke particle
function createParticle(x, y) {
    const p = document.createElement("div");
    p.className = "trail-dot";
    particleContainer.appendChild(p);

    const hue = Math.random() * 360;
    p.style.background = `radial-gradient(circle, hsl(${hue},100%,80%) 0%, hsl(${hue},100%,60%) 50%, hsl(${hue},100%,40%) 100%)`;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.width = (6 + Math.random() * 12) + 'px';
    p.style.height = (6 + Math.random() * 12) + 'px';

    const duration = 1200 + Math.random() * 600;
    const angle = Math.random() * Math.PI * 2;
    const radius = 30 + Math.random() * 50;
    const start = performance.now();

    function animate() {
        const now = performance.now();
        const t = (now - start) / duration;
        if (t >= 1) { p.remove(); return; }

        const dx = Math.cos(angle + t * 10) * radius * t;
        const dy = Math.sin(angle + t * 10) * radius * t + t * 50;
        p.style.transform = `translate(${dx}px, ${dy}px) scale(${1 - t})`;
        p.style.opacity = 1 - t;
        requestAnimationFrame(animate);
    }
    animate();
}

// Emit dense particles on mouse move
let lastTime = 0;
document.addEventListener("mousemove", e => {
    const now = performance.now();
    if (now - lastTime > 10) { // ~100fps emission
        for (let i = 0; i < 5; i++) { createParticle(e.clientX, e.clientY); }
        lastTime = now;
    }
});

// Hover effect
document.querySelectorAll('.p-action-hover').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.classList.add('active'); dot.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { ring.classList.remove('active'); dot.classList.remove('hovered'); });
});

// Click pulse
document.addEventListener('mousedown', () => dot.classList.add('clicked'));
document.addEventListener('mouseup', () => dot.classList.remove('clicked'));