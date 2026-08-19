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

if ("IntersectionObserver" in window) {

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

}


// ===============================
// ORDER BUTTON
// ===============================

document.querySelectorAll(".order-btn").forEach(btn => {

  btn.addEventListener("click", function(e) {

    // WhatsApp link ko normal kaam karne do
    if (this.target === "_blank") {
      return;
    }

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


// ===============================
// TOGGLE CART
// ===============================

function toggleCart() {

  const cartBox =
    document.getElementById("cart");

  if (!cartBox) return;

  cartBox.classList.toggle("active");

}


// IMPORTANT:
// Because script.js is type="module",
// inline HTML onclick needs window function.

window.toggleCart = toggleCart;


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
        ? nameElement.innerText.trim()
        : "Contact Lens";


    const imageUrl =
      imageElement
        ? imageElement.src
        : "";


    // All current Nova Lens products are PKR 1499
    const price = 1499;


    const existing =
      cart.find(item =>
        item.name === name
      );


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


    calculateTotal();

    updateCart();


    const cartBox =
      document.getElementById("cart");

    if (cartBox) {
      cartBox.classList.add("active");
    }

  });

});


// ===============================
// CALCULATE TOTAL
// ===============================

function calculateTotal() {

  total = cart.reduce(
    (sum, item) => {

      return sum +
        (item.price * item.units);

    },
    0
  );

}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

  const cartItems =
    document.getElementById(
      "cart-items"
    );

  const cartTotal =
    document.getElementById(
      "cart-total"
    );

  const cartCount =
    document.getElementById(
      "cartCount"
    );


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
              type="button"
              class="minus"
              data-index="${index}">
              −
            </button>


            <span>
              ${item.units}
            </span>


            <button
              type="button"
              class="plus"
              data-index="${index}">
              +
            </button>

          </div>


          <button
            type="button"
            class="remove"
            data-index="${index}">
            ✖
          </button>

        </div>

        <hr>

      `;


      cartItems.appendChild(div);

    });


    // =========================
    // PLUS
    // =========================

    cartItems
      .querySelectorAll(".plus")
      .forEach(button => {

        button.addEventListener(
          "click",
          function() {

            const index =
              Number(this.dataset.index);

            if (!cart[index]) return;

            cart[index].units++;

            refreshCart();

          }
        );

      });


    // =========================
    // MINUS
    // =========================

    cartItems
      .querySelectorAll(".minus")
      .forEach(button => {

        button.addEventListener(
          "click",
          function() {

            const index =
              Number(this.dataset.index);

            if (!cart[index]) return;


            if (cart[index].units > 1) {

              cart[index].units--;

            } else {

              cart.splice(index, 1);

            }


            refreshCart();

          }
        );

      });


    // =========================
    // REMOVE
    // =========================

    cartItems
      .querySelectorAll(".remove")
      .forEach(button => {

        button.addEventListener(
          "click",
          function() {

            const index =
              Number(this.dataset.index);

            if (!cart[index]) return;

            cart.splice(index, 1);

            refreshCart();

          }
        );

      });

  }


  if (cartTotal) {

    cartTotal.innerText =
      total.toLocaleString("en-PK");

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

  calculateTotal();

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


      // ==========================
      // EMPTY CART
      // ==========================

      if (cart.length === 0) {

        alert(
          "Your cart is empty."
        );

        return;

      }


      // ==========================
      // CUSTOMER DETAILS
      // ==========================

      const customerName =
        document
          .getElementById("customer-name")
          ?.value
          .trim() || "";


      const customerPhone =
        document
          .getElementById("customer-phone")
          ?.value
          .trim() || "";


      const customerEmail =
        document
          .getElementById("customer-email")
          ?.value
          .trim() || "";


      const customerCity =
        document
          .getElementById("customer-city")
          ?.value
          .trim() || "";


      const customerAddress =
        document
          .getElementById("customer-address")
          ?.value
          .trim() || "";


      const payment =
        document.querySelector(
          'input[name="payment"]:checked'
        )?.value || "Cash on Delivery";


      // ==========================
      // VALIDATION
      // ==========================

      if (!customerName) {

        alert("Please enter your full name.");

        return;

      }


      if (!customerPhone) {

        alert("Please enter your phone number.");

        return;

      }


      if (!customerEmail) {

        alert(
          "Please enter your email address.\n\n" +
          "Order confirmation email isi address par jayegi."
        );

        return;

      }


      if (!customerCity) {

        alert("Please enter your city.");

        return;

      }


      if (!customerAddress) {

        alert("Please enter your complete address.");

        return;

      }


      // ==========================
      // ORDER ID
      // ==========================

      const orderId =
        "NL-" +
        Date.now()
          .toString()
          .slice(-6);


      // ==========================
      // DATE
      // ==========================

      const orderTime =
        new Date().toLocaleString(
          "en-PK",
          {
            dateStyle: "medium",
            timeStyle: "short"
          }
        );


      // ==========================
      // EMAIL ITEMS
      // ==========================

      const orderItems =
        cart.map(item => ({

          name:
            item.name,

          units:
            item.units || 1,

          price:
            item.price *
            (item.units || 1),

          image_url:
            item.image_url || ""

        }));


      // ==========================
      // TEXT ORDER ITEMS
      // ==========================

      const orderItemsText =
        cart.map(
          (item, index) => {

            const itemTotal =
              item.price *
              item.units;

            return (
              `${index + 1}. ${item.name}` +
              ` | Qty: ${item.units}` +
              ` | PKR ${itemTotal}`
            );

          }
        ).join("\n");


      // ==========================
      // EMAIL PARAMETERS
      // ==========================

      const templateParams = {

        // CUSTOMER EMAIL
        email:
          customerEmail,

        order_id:
          orderId,

        order_date:
          orderTime,

        customer_name:
          customerName,

        customer_phone:
          customerPhone,

        customer_city:
          customerCity,

        customer_address:
          customerAddress,

        payment_method:
          payment,

        orders:
          orderItems,

        order_items:
          orderItemsText,

        "cost.shipping":
          0,

        "cost.tax":
          0,

        "cost.total":
          total

      };


      // ==========================
      // DISABLE BUTTON
      // ==========================

      checkoutBtn.disabled = true;

      checkoutBtn.innerText =
        "Processing...";


      try {

        // ========================
        // CUSTOMER EMAIL
        // ========================

        await emailjs.send(

          "service_9kp2qxe",

          "template_ylr15kg",

          templateParams

        );


        // ========================
        // ADMIN EMAIL
        // ========================

        const adminParams = {

          ...templateParams,

          email:
            "novalens.official786@gmail.com"

        };


        await emailjs.send(

          "service_9kp2qxe",

          "template_ylr15kg",

          adminParams

        );


        // ========================
        // WHATSAPP MESSAGE
        // ========================

        let message =
          "🛒 *NOVA LENS ORDER*%0A%0A";


        message +=
          `Order ID: ${orderId}%0A`;


        message +=
          `Date: ${encodeURIComponent(orderTime)}%0A%0A`;


        message +=
          `👤 Name: ${encodeURIComponent(customerName)}%0A`;


        message +=
          `📞 Phone: ${encodeURIComponent(customerPhone)}%0A`;


        message +=
          `📧 Email: ${encodeURIComponent(customerEmail)}%0A`;


        message +=
          `🏙️ City: ${encodeURIComponent(customerCity)}%0A`;


        message +=
          `🏠 Address: ${encodeURIComponent(customerAddress)}%0A`;


        message +=
          `💳 Payment: ${encodeURIComponent(payment)}%0A%0A`;


        cart.forEach(
          (item, index) => {

            const itemTotal =
              item.price *
              item.units;


            message +=
              `${index + 1}. ${encodeURIComponent(item.name)}%0A`;

            message +=
              `Qty: ${item.units}%0A`;

            message +=
              `Price: PKR ${itemTotal}%0A%0A`;

          }
        );


        message +=
          `💰 *TOTAL: PKR ${total}*`;


        // ========================
        // OPEN WHATSAPP
        // ========================

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
          orderId +
          "\n\n" +
          "Confirmation email customer ko bhej di gayi hai."
        );


        // ========================
        // CLEAR CART
        // ========================

        cart = [];

        total = 0;

        updateCart();


        // ========================
        // CLOSE CART
        // ========================

        const cartBox =
          document.getElementById("cart");

        if (cartBox) {

          cartBox.classList.remove(
            "active"
          );

        }


        // ========================
        // CLEAR FORM
        // ========================

        const formFields = [
          "customer-name",
          "customer-phone",
          "customer-email",
          "customer-city",
          "customer-address"
        ];


        formFields.forEach(id => {

          const field =
            document.getElementById(id);

          if (field) {
            field.value = "";
          }

        });


      } catch (error) {

        console.error(
          "EmailJS Error:",
          error
        );


        alert(
          "Order email send nahi ho saka. ❌\n\n" +
          "Please check your email and try again."
        );

      } finally {

        checkoutBtn.disabled = false;

        checkoutBtn.innerText =
          "Place Order";

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


// ===============================
// INITIAL CART
// ===============================

updateCart();ction() {

        this.classList.toggle(
          "active"
        );

      }
    );

  });
