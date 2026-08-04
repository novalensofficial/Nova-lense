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


// ===== Order Button =====
document.querySelectorAll(".order-btn").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== SHOPPING CART =====

let cart = [];
let total = 0;

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

document.querySelectorAll(".cart-btn").forEach(button => {
  button.addEventListener("click", function () {

    const card = this.closest(".card");
    const name = card.querySelector("h3").innerText;
    const price = 1499;

    cart.push({ name, price });

    document.getElementById("cartCount").innerText = cart.length;

    total += price;
    document.getElementById("cart-total").innerText = total;

    const item = document.createElement("div");
    item.innerHTML = `
      <p><strong>${name}</strong></p>
      <p>PKR ${price}</p>
      <hr>
    `;

    document.getElementById("cart-items").appendChild(item);

    document.getElementById("cart").classList.add("active");
  });
});
