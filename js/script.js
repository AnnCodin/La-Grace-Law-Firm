// Nav toggle
function toggleNav() {
  document.getElementById("navbar").classList.toggle("open");
}

// Counter animation
const counters = document.querySelectorAll(".counter-num");
let animated = false;

function animateCounters() {
  counters.forEach((el) => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  },
  { threshold: 0.4 },
);

const counterSection = document.getElementById("counters");
if (counterSection) observer.observe(counterSection);

// Scroll reveal
const revealEls = document.querySelectorAll(
  ".practice-card, .attorney-card, .news-card, .stat-item",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

revealEls.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition =
    "opacity .5s ease, transform .5s ease, background .3s, border-color .3s, box-shadow .3s";
  revealObserver.observe(el);
});
