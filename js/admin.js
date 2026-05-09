console.log("admin.js loaded");

// ---------- LOGIN ----------
function login() {
    console.log("Login clicked");

    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");

    if (!userInput || !passwordInput) {
        console.error("Login inputs not found.");
        return;
    }

    const username = userInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "admin" && password === "12345") {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin-dashboard.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}


// ---------- DASHBOARD PROTECTION ----------
if (window.location.pathname.includes("admin-dashboard.html")) {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (isLoggedIn !== "true") {
        alert("Please login first.");
        window.location.href = "admin.html";
    }
}


// ---------- ADMIN ITEMS ----------
let adminItems = JSON.parse(localStorage.getItem("adminItems")) || [];


// ---------- SHOW ITEMS ----------
function showItems() {
    const list = document.getElementById("list");

    if (!list) return;

    list.innerHTML = "";

    const defaultItems = allMenuItems.map(item => ({
        ...item,
        isDefault: true
    }));

    const addedItems = adminItems.map(item => ({
        ...item,
        isDefault: false
    }));

    const allItems = [...defaultItems, ...addedItems];

    allItems.forEach(item => {
        list.innerHTML += `
            <div class="border p-3 mt-3 rounded shadow bg-white">
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Price:</strong> Rs.${item.price}</p>

                <img 
                    src="${item.img}" 
                    class="w-32 h-24 object-cover mt-2 rounded"
                    onerror="this.src='assets/images/default.jpg'"
                >

                ${
                    item.isDefault
                    ? `<p class="text-gray-500 mt-2">Default item</p>`
                    : `<button onclick="deleteItem(${item.id})"
                            class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 mt-2">
                            Delete
                       </button>`
                }
            </div>
        `;
    });
}


// ---------- ADD ITEM ----------
function addItem() {
    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const img = document.getElementById("img").value.trim();

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

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("img").value = "";

    showItems();

    alert("Item added successfully.");
}


// ---------- DELETE ITEM ----------
function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    adminItems = adminItems.filter(item => item.id !== id);
    localStorage.setItem("adminItems", JSON.stringify(adminItems));

    showItems();
}


// ---------- LOGOUT ----------
function logout() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "admin.html";
}


// ---------- GO HOME ----------
function goHome() {
    window.location.href = "index.html";
}


// ---------- ONLY RUN DASHBOARD CODE ON DASHBOARD PAGE ----------
if (window.location.pathname.includes("admin-dashboard.html")) {
    showItems();
}