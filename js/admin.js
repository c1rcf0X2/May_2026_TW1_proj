// admin login
function login() {
    
const username = document.getElementById("user").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "12345") {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin-dashboard.html";
        //window.location.href = "index.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}


// protection for admin dashboard
if (window.location.pathname.includes("admin-dashboard.html")) {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (isLoggedIn !== "true") {
        alert("Please login first.");
        window.location.href = "admin.html";
    }
}


// Load admin items and display
let adminItems = JSON.parse(localStorage.getItem("adminItems")) || [];

function showItems() {
    const list = document.getElementById("list");

    if (!list) return;

    list.innerHTML = "";

    const allItems = [...allMenuItems, ...adminItems];

    allItems.forEach((item) => {
        list.innerHTML += `
            <div class="border p-3 mt-3 rounded shadow">
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Price:</strong> Rs.${item.price}</p>
                <img src="${item.img}" class="w-32 h-24 object-cover mt-2">
            </div>
        `;
    });
}


// ---------- ADD NEW ITEM ----------
function addItem() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const img = document.getElementById("img").value;

    if (name === "" || price === "" || img === "") {
        alert("Please fill all fields.");
        return;
    }

    const newItem = {
        id: Date.now(),
        name: name,
        price: Number(price),
        img: img
    };

    adminItems.push(newItem);
    localStorage.setItem("adminItems", JSON.stringify(adminItems));

    alert("Item added successfully.");

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("img").value = "";

    showItems();
}


// ---------- LOGOUT ----------
function logout() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "admin.html";
}

showItems();