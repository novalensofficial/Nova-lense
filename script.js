// ===============================
// NOVA LENS - CART SYSTEM
// ===============================

let cart = [];
let total = 0;


// ===============================
// OPEN / CLOSE CART
// ===============================

function toggleCart() {
    const cartBox = document.getElementById("cart");

    if (cartBox) {
        cartBox.classList.toggle("active");
    }
}

window.toggleCart = toggleCart;


// ===============================
// ADD TO CART
// ===============================

function addToCart(button) {

    const card = button.closest(".card");

    if (!card) {
        alert("Product not found ❌");
        return;
    }

    const name =
        card.querySelector("h3")?.innerText.trim() ||
        "Contact Lens";

    const priceText =
        card.querySelector("p")?.innerText || "PKR 1499";

    const price =
        Number(priceText.replace(/[^0-9]/g, "")) || 1499;

    const image =
        card.querySelector("img")?.src || "";

    const existing =
        cart.find(item => item.name === name);

    if (existing) {

        existing.units++;

    } else {

        cart.push({
            name: name,
            price: price,
            units: 1,
            image_url: image
        });

    }

    updateCart();

    const cartBox =
        document.getElementById("cart");

    if (cartBox) {
        cartBox.classList.add("active");
    }

}

window.addToCart = addToCart;


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


    // TOTAL

    total = cart.reduce(function(sum, item) {

        return sum +
            (item.price * item.units);

    }, 0);


    // CART COUNT

    if (cartCount) {

        cartCount.innerText =
            cart.reduce(function(sum, item) {

                return sum + item.units;

            }, 0);

    }


    // CART TOTAL

    if (cartTotal) {

        cartTotal.innerText =
            total.toLocaleString("en-PK");

    }


    if (!cartItems) return;


    cartItems.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p style="text-align:center;padding:20px;">
                Your cart is empty.
            </p>`;

        return;
    }


    // PRODUCTS

    cart.forEach(function(item, index) {

        const div =
            document.createElement("div");

        div.className =
            "cart-item";


        div.innerHTML = `

            <div style="
                display:flex;
                align-items:center;
                gap:10px;
                margin-bottom:12px;
            ">

                <img
                    src="${item.image_url}"
                    alt="${item.name}"
                    style="
                        width:55px;
                        height:55px;
                        object-fit:cover;
                        border-radius:8px;
                    "
                >

                <div style="flex:1;">

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    <small>
                        PKR ${item.price.toLocaleString()}
                    </small>

                </div>


                <button
                    type="button"
                    onclick="changeQty(${index}, -1)"
                >
                    −
                </button>


                <span>
                    ${item.units}
                </span>


                <button
                    type="button"
                    onclick="changeQty(${index}, 1)"
                >
                    +
                </button>


                <button
                    type="button"
                    onclick="removeFromCart(${index})"
                >
                    ✖
                </button>

            </div>

            <hr>

        `;


        cartItems.appendChild(div);

    });

}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQty(index, amount) {

    if (!cart[index]) return;


    cart[index].units += amount;


    if (cart[index].units <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}

window.changeQty = changeQty;


// ===============================
// REMOVE PRODUCT
// ===============================

function removeFromCart(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    updateCart();

}

window.removeFromCart = removeFromCart;


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function() {


    // ===========================
    // ADD TO CART BUTTONS
    // ===========================

    document
        .querySelectorAll(".cart-btn")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    addToCart(this);

                }
            );

        });


    // ===========================
    // SEARCH
    // ===========================

    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function() {

                const value =
                    this.value
                        .toLowerCase()
                        .trim();


                document
                    .querySelectorAll(".card")
                    .forEach(function(card) {

                        const name =
                            card.querySelector("h3")
                                ?.innerText
                                .toLowerCase() || "";


                        card.style.display =
                            name.includes(value)
                                ? ""
                                : "none";

                    });

            }
        );

    }


    // ===========================
    // WISHLIST
    // ===========================

    document
        .querySelectorAll(".wishlist")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    this.classList.toggle(
                        "active"
                    );

                }
            );

        });


    // ===========================
    // CHECKOUT
    // ===========================

    const checkoutBtn =
        document.getElementById("checkoutBtn");


    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            placeOrder
        );

    }

});


// ===============================
// EMAILJS
// ===============================

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey:
            "Lid3wmOPISObRCJjn"
    });

}


// ===============================
// PLACE ORDER
// ===============================

async function placeOrder(e) {

    if (e) {
        e.preventDefault();
    }


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    const customerName =
        document
            .getElementById("customer-name")
            ?.value.trim();


    const customerPhone =
        document
            .getElementById("customer-phone")
            ?.value.trim();


    const customerEmail =
        document
            .getElementById("customer-email")
            ?.value.trim();


    const customerCity =
        document
            .getElementById("customer-city")
            ?.value.trim();


    const customerAddress =
        document
            .getElementById("customer-address")
            ?.value.trim();


    const payment =
        document
            .querySelector(
                'input[name="payment"]:checked'
            )
            ?.value ||
            "Cash on Delivery";


    if (!customerName) {

        alert(
            "Please enter your full name."
        );

        return;
    }


    if (!customerPhone) {

        alert(
            "Please enter your phone number."
        );

        return;
    }


    if (!customerEmail) {

        alert(
            "Please enter your email address."
        );

        return;
    }


    if (!customerCity) {

        alert(
            "Please enter your city."
        );

        return;
    }


    if (!customerAddress) {

        alert(
            "Please enter your complete address."
        );

        return;
    }


    const orderId =
        "NL-" +
        Date.now()
            .toString()
            .slice(-6);


    const orderTime =
        new Date()
            .toLocaleString("en-PK");


    const orderItemsText =
        cart
            .map(function(item, index) {

                const itemTotal =
                    item.price *
                    item.units;


                return (
                    `${index + 1}. ${item.name}` +
                    ` | Qty: ${item.units}` +
                    ` | PKR ${itemTotal}`
                );

            })
            .join("\n");


    const checkoutBtn =
        document.getElementById(
            "checkoutBtn"
        );


    if (checkoutBtn) {

        checkoutBtn.disabled =
            true;

        checkoutBtn.innerText =
            "Processing...";

    }


    try {


        // =========================
        // EMAIL
        // =========================

        if (
            typeof emailjs !==
            "undefined"
        ) {


            const templateParams = {

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

                order_items:
                    orderItemsText,

                orders:
                    cart.map(
                        function(item) {

                            return {

                                name:
                                    item.name,

                                units:
                                    item.units,

                                price:
                                    item.price *
                                    item.units,

                                image_url:
                                    item.image_url

                            };

                        }
                    ),

                "cost.shipping":
                    0,

                "cost.tax":
                    0,

                "cost.total":
                    total

            };


            await emailjs.send(

                "service_9kp2qxe",

                "template_ylr15kg",

                templateParams

            );


            await emailjs.send(

                "service_9kp2qxe",

                "template_ylr15kg",

                {
                    ...templateParams,

                    email:
                        "novalens.official786@gmail.com"
                }

            );

        }


        // =========================
        // WHATSAPP
        // =========================

        let message =
            "🛒 *NOVA LENS ORDER*%0A%0A";


        message +=
            `Order ID: ${encodeURIComponent(orderId)}%0A`;


        message +=
            `Name: ${encodeURIComponent(customerName)}%0A`;


        message +=
            `Phone: ${encodeURIComponent(customerPhone)}%0A`;


        message +=
            `Email: ${encodeURIComponent(customerEmail)}%0A`;


        message +=
            `City: ${encodeURIComponent(customerCity)}%0A`;


        message +=
            `Address: ${encodeURIComponent(customerAddress)}%0A`;


        message +=
            `Payment: ${encodeURIComponent(payment)}%0A%0A`;


        cart.forEach(
            function(item, index) {

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


        window.open(

            `https://wa.me/923494908724?text=${message}`,

            "_blank"

        );


        alert(
            "Order placed successfully! ✅\n\n" +
            "Order ID: " +
            orderId
        );


        cart = [];

        total = 0;

        updateCart();


        const cartBox =
            document.getElementById(
                "cart"
            );


        if (cartBox) {

            cartBox.classList.remove(
                "active"
            );

        }


    }
    catch(error) {

        console.error(
            "EmailJS Error:",
            error
        );


        alert(
            "Order email send nahi ho saki. ❌"
        );

    }
    finally {

        if (checkoutBtn) {

            checkoutBtn.disabled =
                false;

            checkoutBtn.innerText =
                "Place Order";

        }

    }

}


// ===============================
// START CART
// ===============================

updateCart();
