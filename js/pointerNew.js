// Setup cursor elements
const dot = document.getElementById("pointer-dot");
const ring = document.getElementById("pointer-ring");

// Optional: container for particle trail
const particleContainer = document.createElement("div");
document.body.appendChild(particleContainer);

let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Move main dot
  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";

  // Move ring
  ring.style.left = mouseX + "px";
  ring.style.top = mouseY + "px";

  // Create a particle (smoke) at the position
  const p = document.createElement("div");
  p.className = "particle";
  particleContainer.appendChild(p);
  p.style.left = (mouseX + (Math.random()*10 - 5)) + "px";
  p.style.top = (mouseY + (Math.random()*10 - 5)) + "px";

  // Animate particle fade & movement
  const duration = 1000; // 1 second
  const dx = (Math.random() * 40 - 20);
  const dy = (Math.random() * 40 - 20);
  const start = performance.now();

  function animate() {
    const now = performance.now();
    const elapsed = now - start;
    const t = elapsed / duration;
    if (t >= 1) {
      p.remove();
      return;
    }
    p.style.transform = `translate(${dx * t}px, ${dy * t}px) scale(${1 - t})`;
    p.style.opacity = `${1 - t}`;
    requestAnimationFrame(animate);
  }
  animate();
});
