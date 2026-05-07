let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.getElementById("cartItems");
let total = 0;

cart.forEach((item) => {
    total += item.price;
    container.innerHTML += `<div> ${item.name} - Rs.${item.price} </div>`;
});

document.getElementById("total").innerText = "Total: Rs." + total;

function placeOrder() {
    alert("Order placed");
    localStorage.removeItem("cart");
    location.reload();
}
