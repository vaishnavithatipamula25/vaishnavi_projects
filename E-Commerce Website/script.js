let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

function addToCart(product, price) {
    cart.push({ product, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItems) return; // Prevents errors on checkout page

    cartItems.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price;
        let li = document.createElement("li");
        li.textContent = `${item.product} - ₹${item.price}`;
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    cartCount.textContent = cart.length;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function goToCheckout() {
    window.location.href = "checkout.html";
}

function loadCheckout() {
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");

    if (!checkoutItems) return; // Prevents errors on the main page

    checkoutItems.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item) => {
        totalPrice += item.price;
        let li = document.createElement("li");
        li.textContent = `${item.product} - ₹${item.price}`;
        checkoutItems.appendChild(li);
    });

    checkoutTotal.textContent = totalPrice.toFixed(2);
}

function completePurchase() {
    alert("Payment Successful! Thank you for shopping MAMAEARTH");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

if (window.location.pathname.includes("checkout.html")) {
    loadCheckout();
}
