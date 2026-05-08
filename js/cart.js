let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.getElementById("cartItems");
let total = 0;

cart.forEach((item) => {
    total += item.price;
    container.innerHTML += `<div> ${item.name} - Rs.${item.price} </div>`;
});

document.getElementById("total").innerText = "Total: Rs." + total;

function placeOrder() {
    if (localStorage.getItem("cart") === null){
        alert("Your cart is empty");
    } else {
        alert("Order placed");
        localStorage.removeItem("cart");
        location.reload();
    }
}
function backToHome() {
    window.location.href = "index.html";
}

