// ===============================
// EMAILJS
// ===============================

import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm";

emailjs.init({
  publicKey: "Lid3wmOPISObRCJjn"
});


// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll("nav a").forEach(link => {

  link.addEventListener("click", function(e) {

    e.preventDefault();

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }

  });

});


// ===============================
// HEADER SHADOW
// ===============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (!header) return;

  if (window.scrollY > 80) {
    header.style.boxShadow =
      "0 10px 30px rgba(0,0,0,.15)";
  } else {
    header.style.boxShadow =
      "0 5px 20px rgba(0,0,0,.12)";
  }

});


// ===============================
// FADE ANIMATION
// ===============================

const items = document.querySelectorAll(
  ".feature-box, .card, .review-card"
);

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform =
          "translateY(0)";

      }

    });

  },
  {
    threshold: 0.2
  }
);

items.forEach(item => {

  item.style.opacity = "0";

  item.style.transform =
    "translateY(40px)";

  item.style.transition =
    "0.6s ease";

  observer.observe(item);

});


// ===============================
// ORDER BUTTON
// ===============================

document.querySelectorAll(".order-btn").forEach(btn => {

  btn.addEventListener("click", function(e) {

    e.preventDefault();

    const contact =
      document.querySelector("#contact");

    if (contact) {

      contact.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});


// ===============================
// CART
// ===============================

let cart = [];

let total = 0;


function toggleCart() {

  const cartBox =
    document.getElementById("cart");

  if (cartBox) {
    cartBox.classList.toggle("active");
  }

}


// ===============================
// ADD TO CART
// ===============================

document.querySelectorAll(".cart-btn").forEach(button => {

  button.addEventListener("click", function() {

    const card =
      this.closest(".card");

    if (!card) return;


    const nameElement =
      card.querySelector("h3");

    const imageElement =
      card.querySelector("img");


    const name =
      nameElement
        ? nameElement.innerText
        : "Contact Lens";


    const imageUrl =
      imageElement
        ? imageElement.src
        : "";


    const price = 1499;


    const existing =
      cart.find(item => item.name === name);


    if (existing) {

      existing.units++;

    } else {

      cart.push({

        name: name,

        price: price,

        units: 1,

        image_url: imageUrl

      });

    }


    total = cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.units,
      0
    );


    updateCart();

    document
      .getElementById("cart")
      ?.classList.add("active");

  });

});


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

  const cartItems =
    document.getElementById("cart-items");

  const cartTotal =
    document.getElementById("cart-total");

  const cartCount =
    document.getElementById("cartCount");


  if (cartItems) {

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

      const div =
        document.createElement("div");

      div.className =
        "cart-item";


      div.innerHTML = `

        <div class="cart-row">

          <div>

            <strong>
              ${item.name}
            </strong>

            <br>

            <small>
              PKR ${item.price}
            </small>

          </div>


          <div class="qty">

            <button
              class="minus"
              data-index="${index}">
              −
            </button>


            <span>
              ${item.units}
            </span>


            <button
              class="plus"
              data-index="${index}">
              +
            </button>

          </div>


          <button
            class="remove"
            data-index="${index}">
            ✖
          </button>

        </div>

        <hr>

      `;


      cartItems.appendChild(div);

    });


    // PLUS

    cartItems
      .querySelectorAll(".plus")
      .forEach(button => {

        button.addEventListener(
          "click",
          function() {

            const index =
              Number(this.dataset.index);

            cart[index].units++;

            refreshCart();

          }
        );

      });


    // MINUS

    cartItems
      .querySelectorAll(".minus")
      .forEach(button => {

        button.addEventListener(
          "click",
          function() {

            const index =
              Number(this.dataset.index);


            if (cart[index].units > 1) {

              cart[index].units--;

            } else {

              cart.splice(index, 1);

            }


            refreshCart();

          }
        );

      });


    // REMOVE

    cartItems
      .querySelectorAll(".remove")
      .forEach(button => {

        button.addEventListener(
          "click",
          function() {

            const index =
              Number(this.dataset.index);

            cart.splice(index, 1);

            refreshCart();

          }
        );

      });

  }


  if (cartTotal) {
    cartTotal.innerText = total;
  }


  if (cartCount) {

    cartCount.innerText =
      cart.reduce(
        (sum, item) =>
          sum + item.units,
        0
      );

  }

}


// ===============================
// REFRESH CART
// ===============================

function refreshCart() {

  total = cart.reduce(
    (sum, item) =>
      sum +
      item.price *
      item.units,
    0
  );

  updateCart();

}


// ===============================
// CHECKOUT
// ===============================

const checkoutBtn =
  document.getElementById(
    "checkoutBtn"
  );


if (checkoutBtn) {

  checkoutBtn.addEventListener(
    "click",
    async function(e) {

      e.preventDefault();


      if (cart.length === 0) {

        alert(
          "Your cart is empty."
        );

        return;

      }


      // ORDER ID

      const orderId =
        "NL-" +
        Date.now()
          .toString()
          .slice(-6);


      // DATE

      const orderTime =
        new Date().toLocaleString(
          "en-PK"
        );


      // ==========================
      // EMAIL ITEMS
      // ==========================

      const orderItems =
        cart.map(item => ({

          name: item.name,

          units:
            item.units || 1,

          price:
            item.price *
            (item.units || 1),

          image_url:
            item.image_url || ""

        }));


      // ==========================
      // EMAIL PARAMETERS
      // ==========================

      const templateParams = {

        email:
          "novalens.official786@gmail.com",

        order_id:
          orderId,

        orders:
          orderItems,

        "cost.shipping":
          0,

        "cost.tax":
          0,

        "cost.total":
          total

      };


      try {

        // ========================
        // SEND EMAIL
        // ========================

        await emailjs.send(

          "service_9kp2qxe",

          "template_ylr15kg",

          templateParams

        );


        // ========================
        // WHATSAPP
        // ========================

        let message =
          "🛒 *NOVA LENS ORDER*%0A%0A";


        message +=
          `Order ID: ${orderId}%0A`;


        message +=
          `Date: ${orderTime}%0A%0A`;


        cart.forEach(
          (item, index) => {

            const itemTotal =
              item.price *
              item.units;


            message +=
              `${index + 1}. ${item.name}%0A`;

            message +=
              `Qty: ${item.units}%0A`;

            message +=
              `Price: PKR ${itemTotal}%0A%0A`;

          }
        );


        message +=
          `💰 *TOTAL: PKR ${total}*`;


        window.open(

          `https://wa.me/923494908724?text=${message}`,

          "_blank"

        );


        // ========================
        // SUCCESS
        // ========================

        alert(
          "Order placed successfully! ✅\n\n" +
          "Order ID: " +
          orderId
        );


      } catch (error) {

        console.error(
          "EmailJS Error:",
          error
        );


        alert(
          "Order email send nahi ho saka. ❌\n\n" +
          "Please try again."
        );

      }

    }
  );

}


// ===============================
// SEARCH
// ===============================

const searchInput =
  document.getElementById(
    "searchInput"
  );


if (searchInput) {

  searchInput.addEventListener(
    "keyup",
    function() {

      const value =
        this.value
          .toLowerCase()
          .trim();


      document
        .querySelectorAll(".card")
        .forEach(card => {

          const name =
            card
              .querySelector("h3")
              ?.innerText
              .toLowerCase() || "";


          card.style.display =
            name.includes(value)
              ? "block"
              : "none";

        });

    }
  );

}


// ===============================
// WISHLIST
// ===============================

document
  .querySelectorAll(".wishlist")
  .forEach(btn => {

    btn.addEventListener(
      "click",
      function() {

        this.classList.toggle(
          "active"
        );

      }
    );

  });
