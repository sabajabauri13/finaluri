const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar')

if (bar){
    bar.addEventListener('click',() =>{
        nav.classList.add('active');

    })
}
if (close){
    bar.addEventListener('click',() =>{
        nav.classList.remove('active');

    })
}
// Sample product data
const products = [
    { id: 1, name: 'პროდუქტი 1', price: 19.99, image: 'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75' },
    { id: 2, name: 'პროდუქტი 2', price: 29.99, image: 'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75' },
    { id: 3, name: 'პროდუქტი 3', price: 39.99, image: 'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75' },
    { id: 4, name: 'პროდუქტი 4', price: 49.99, image: 'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75' },
];

let cart = [];

// Function to render products
function renderProducts(filteredProducts = products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear current list
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">ფასი: ${product.price}₾</p>
            <button onclick="addToCart(${product.id})">კალათაში დამატება</button>
        `;
        productList.appendChild(productElement);
    });
}

// Function to filter products by name
function filterProducts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery)
    );
    renderProducts(filteredProducts);
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    cart.push(product);
    alert(`${product.name} დაემატა კალათაში!`);
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('totalAmount');
    
    cartItemsContainer.innerHTML = ''; // Clear current cart items
    let totalAmount = 0;

    // Loop through the cart array to display each item
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <p><strong>${item.name}</strong></p>
                <p>ფასი: ${item.price}₾</p>
            </div>
            <button onclick="removeFromCart(${index})">წაშლა</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        totalAmount += item.price;
    });

    // Update the total amount displayed
    cartTotal.textContent = `მთლიანი: ${totalAmount.toFixed(2)}₾`;

    // If cart is empty, display a message
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>კალათაში არცერთი პროდუქტი არ არის.</p>';
        cartTotal.textContent = 'მთლიანი: 0₾';
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    updateCart(); // Re-render the cart after removing the item
}

// Function to check if the document is ready
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// Initialize the page
docReady(() => {
    renderProducts();
});
