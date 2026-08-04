// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ===== Header Shadow on Scroll =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
  } else {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,.12)";
  }
});

// ===== Simple Fade Animation =====
const items = document.querySelectorAll(
  '.feature-box, .card, .review-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, {
  threshold: 0.2
});

items.forEach(item => {
  item.style.opacity = "0";
  item.style.transform = "translateY(40px)";
  item.style.transition = "0.6s ease";
  observer.observe(item);
});

// ===== Product Button Effect =====
document.querySelectorAll(".buy").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    alert("Thank you! WhatsApp ordering will be connected here.");
  });
});

// ===== Order Button =====
document.querySelectorAll(".order-btn").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth"
    });
  });
});
