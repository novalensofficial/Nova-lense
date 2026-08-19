// ===== EMAILJS =====
import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm";

emailjs.init({
  publicKey: "Lid3wmOPISObRCJjn"
});


// ===== Smooth Scroll for Navigation =====
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// ===== Header Shadow on Scroll =====
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
  } else {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,.12)";
  }
});


// ===== Fade Animation =====
const items = document.querySelectorAll(
  ".feature-box, .card, .review-card"
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

    const contact = document.querySelector("#contact");

    if (contact) {
      contact.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// ===== SHOPPING CART =====

let cart = [];
let total = 0;


function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}


// ===== ADD TO CART =====

document.querySelectorAll(".cart-btn").forEach(button => {

  button.addEventListener("click", function() {

    const card = this.closest(".card");

    const name = card.querySelector("h3").innerText;

    const price = 1499;

    cart.push({
      name: name,
      price: price,
      units: 1
    });

    total += price;

    document.getElementById("cartCount").innerText = cart.length;

    document.getElementById("cart-total").innerText = total;


    const item = document.createElement("div");

    item.className = "cart-item";

    item.innerHTML = `
      <div class="cart-row">

        <div>
          <strong>${name}</strong><br>
          <small>PKR ${price}</small>
        </div>

        <div class="qty">
          <button class="minus">−</button>
          <span class="quantity">1</span>
          <button class="plus">+</button>
        </div>

        <button class="remove">✖</button>

      </div>

      <hr>
    `;


    const qty = item.querySelector(".quantity");

    const plus = item.querySelector(".plus");

    const minus = item.querySelector(".minus");

    const remove = item.querySelector(".remove");


    let quantity = 1;


    // PLUS

    plus.addEventListener("click", () => {

      quantity++;

      qty.innerText = quantity;

      const cartItem = cart.find(
        product => product.name === name
      );

      if (cartItem) {
        cartItem.units = quantity;
      }

      total += price;

      document.getElementById("cart-total").innerText = total;

    });


    // MINUS

    minus.addEventListener("click", () => {

      if (quantity > 1) {

        quantity--;

        qty.innerText = quantity;

        const cartItem = cart.find(
          product => product.name === name
        );

        if (cartItem) {
          cartItem.units = quantity;
        }

        total -= price;

        document.getElementById("cart-total").innerText = total;
      }

    });


    // REMOVE

    remove.addEventListener("click", () => {

      total -= price * quantity;

      document.getElementById("cart-total").innerText = total;

      const index = cart.findIndex(
        product => product.name === name
      );

      if (index !== -1) {
        cart.splice(index, 1);
      }

      document.getElementById("cartCount").innerText =
        cart.length;

      item.remove();

    });


    document
      .getElementById("cart-items")
      .appendChild(item);

    document
      .getElementById("cart")
      .classList.add("active");

  });

});


// =================================================
// CHECKOUT → EMAIL + WHATSAPP
// =================================================

const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {

  checkoutBtn.addEventListener("click", async function(e) {

    e.preventDefault();


    // EMPTY CART

    if (cart.length === 0) {

      alert("Your cart is empty.");

      return;

    }


    // ORDER ID

    const orderId =
      "NL-" +
      Date.now().toString().slice(-6);


    // ORDER TIME

    const orderTime =
      new Date().toLocaleString("en-PK");


    // EMAIL ORDER DATA

    const orderItems = cart.map(item => ({

      name: item.name,

      units: item.units || 1,

      price: item.price,

      image_url: ""

    }));


    // EMAIL PARAMETERS

    const templateParams = {

      email: "novalens.official786@gmail.com",

      order_id: orderId,

      orders: orderItems,

      "cost.shipping": 0,

      "cost.tax": 0,

      "cost.total": total

    };


    try {

      // SEND EMAIL

      await emailjs.send(
        "service_9kp2qxe",
        "template_ylr15kg",
        templateParams
      );


      // WHATSAPP MESSAGE

      let message =
        "🛒 *NOVA LENS ORDER*%0A%0A";

      message +=
        `Order ID: ${orderId}%0A`;

      message +=
        `Date: ${orderTime}%0A%0A`;


      cart.forEach((item, index) => {

        message +=
          `${index + 1}. ${item.name}`;

        message +=
          ` × ${item.units || 1}`;

        message +=
          ` - PKR ${item.price * (item.units || 1)}%0A`;

      });


      message +=
        `%0A💰 *Total: PKR ${total}*`;


      // OPEN WHATSAPP

      window.open(
        `https://wa.me/923494908724?text=${message}`,
        "_blank"
      );


      // SUCCESS MESSAGE

      alert(
        "Order received successfully! ✅\n\n" +
        "Nova Lens ne aapka order receive kar liya hai."
      );


    } catch (error) {

      console.error("EmailJS Error:", error);

      alert(
        "Email send nahi ho saka. ❌\n\n" +
        "Please try again."
      );

    }

  });

}


// ===== SEARCH =====

const searchInput =
  document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("keyup", function() {

    const value =
      this.value.toLowerCase();

    document
      .querySelectorAll(".card")
      .forEach(card => {

        const name =
          card
            .querySelector("h3")
            .innerText
            .toLowerCase();

        if (name.includes(value)) {

          card.style.display = "block";

        } else {

          card.style.display = "none";

        }

      });

  });

}


// ===== WISHLIST =====

document
  .querySelectorAll(".wishlist")
  .forEach(btn => {

    btn.addEventListener("click", function() {

      this.classList.toggle("active");

    });

  });
