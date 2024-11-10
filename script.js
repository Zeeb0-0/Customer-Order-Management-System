// Initial Stock Data
let stock = {
    "Item A": 10,
    "Item B": 5,
    "Item C": 8
};

// Order Data
let order = {};

// Render the Stock List
function renderStock() {
    const stockList = document.getElementById("stock-items");
    stockList.innerHTML = "";
    for (const [item, quantity] of Object.entries(stock)) {
        const stockItem = document.createElement("div");
        stockItem.className = "stock-item";
        stockItem.innerHTML = `
            <span>${item}: ${quantity} in stock</span>
            <button class="btn" onclick="addToOrder('${item}')">Add to Order</button>
        `;
        stockList.appendChild(stockItem);
    }
}

// Render the Order List
function renderOrder() {
    const orderList = document.getElementById("order-items");
    orderList.innerHTML = "";
    for (const [item, quantity] of Object.entries(order)) {
        const orderItem = document.createElement("div");
        orderItem.className = "order-item";
        orderItem.innerHTML = `
            <span>${item}: ${quantity}</span>
            <div>
                <button class="btn" onclick="increaseQuantity('${item}')">+</button>
                <button class="btn" onclick="decreaseQuantity('${item}')">-</button>
                <i class="fas fa-trash remove-btn" onclick="removeFromOrder('${item}')"></i>
            </div>
        `;
        orderList.appendChild(orderItem);
    }
}

// Add item to the order
function addToOrder(item) {
    if (stock[item] > 0) {
        if (!order[item]) {
            order[item] = 1;
        } else {
            order[item]++;
        }
        stock[item]--;
    }
    renderStock();
    renderOrder();
}

// Increase the quantity of the item in the order
function increaseQuantity(item) {
    if (stock[item] > 0) {
        order[item]++;
        stock[item]--;
    }
    renderStock();
    renderOrder();
}

// Decrease the quantity of the item in the order
function decreaseQuantity(item) {
    if (order[item] > 1) {
        order[item]--;
        stock[item]++;
    } else {
        removeFromOrder(item);
    }
    renderStock();
    renderOrder();
}

// Remove item from the order
function removeFromOrder(item) {
    stock[item] += order[item];
    delete order[item];
    renderStock();
    renderOrder();
}

// Confirm Order and Display Receipt
function confirmOrder() {
    const receipt = document.getElementById("receipt");
    const receiptContent = document.getElementById("receipt-content");

    if (Object.keys(order).length === 0) {
        receiptContent.innerHTML = "Your order is empty.";
    } else {
        let receiptText = "";
        for (const [item, quantity] of Object.entries(order)) {
            receiptText += `${item}: ${quantity}<br>`;
        }
        receiptContent.innerHTML = receiptText;
    }

    receipt.style.display = "block";
}

// Initialize the Stock and Order Lists
renderStock();
renderOrder();