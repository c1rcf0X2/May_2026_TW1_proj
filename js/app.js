const menuContainer = document.getElementById("menu");
const searchInput = document.getElementById("search");

function displayItems(items) {
    menuContainer.innerHTML = "";
    items.forEach(item => {
        menuContainer.innerHTML += `
            <div class="bg-white p-4 shadow rounded">
                <img src="${item.img}" class="w-full h-40 object-cover" onerror="this.src='assets/images/default.jpg'">
                <h2>${item.name}</h2>
                <p>Rs. ${item.price}</p>
                <button onclick="addToCart(${item.id})" class="bg-green-600" text-white px-2 py-1">Add</button>

            </div>`;
    });
}
let adminItems = JSON.parse(localStorage.getItem("adminItems")) || [];
let allMenuItems = [...allMenuItems, ...adminItems];

displayItems(allMenuItems);

searchInput.addEventListener("keyup", () => {
    let val = searchInput.value.toLowerCase();
    displayItems(allMenuItems.filter(i => i.name.toLowerCase().includes(val)));

});

//function add cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = allMenuItems.find(i => i.id === id);
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart....");
}
