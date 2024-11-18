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

const products = [
    { id: 1, name: 'ყურძენი1', price: 19.99, image: './images/qwq.jfif' },
    { id: 2, name: 'ბროწეული', price: 27.00, image: './images/broweuli.jfif' },
    { id: 3, name: 'ყურძენი2', price: 39.99, image: './images/yurdzeni.jfif' },
    { id: 4, name: 'წერილი', price: 49.99, image: './images/werili.jfif' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function renderProducts(filteredProducts = products) {
    const productList = document.getElementById('productList');
    if (productList != null) {
        productList.innerHTML = ''; 
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
}

function renderCartProducts() {
    const productList = document.getElementById('CartProductList');
    if (productList != null) {
        productList.innerHTML = ''; 
        if (cart.length == 0){
            productList.innerHTML = '<p>კალათაში არცერთი პროდუქტი არ არის.</p>';
        }
        else{
            cart.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">ფასი: ${product.price}₾</p>
                    <button onclick="deleteFromCart(${product.id})">კალათიდან წაშლა</button>
                `;
                productList.appendChild(productElement);
            });
        }
    }
}


function filterProducts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery)
    );
    renderProducts(filteredProducts);
}


function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    cart.push(product);
    console.log(cart);
    saveCartToLocalStorage();
    alert(`${product.name} დაემატა კალათაში!`);
}

function deleteFromCart(productId) {
    let index = cart.indexOf(x => x.id == productId);
    cart.splice(index, 1); 
    saveCartToLocalStorage(); 
    reflectCartUpdates(); 
    console.log(cart);
    alert(`წაიშალა კალათიდან!`);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function reflectCartUpdates() {
    renderCartProducts();
    const cartTotal = document.getElementById('totalAmount');
    if (cartTotal != null) {
        let totalAmount = 0;
        cart.forEach(product => {
            totalAmount += product.price;
        });
        cartTotal.textContent = `მთლიანი: ${totalAmount.toFixed(2)}₾`;
    }
}


function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}


docReady(() => {
    renderProducts();
    reflectCartUpdates();
});
