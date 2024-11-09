const searchBtn = document.querySelector('.search-icon i')
const formSearch = document.querySelector('.search-box')

searchBtn.addEventListener('click', function() {
    formSearch.classList.toggle('active')
})

document.addEventListener('DOMContentLoaded', () => {
    function addToCart(productId, productName, productPrice, productImg) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        
        const existingProduct = cart.findIndex(item => item.name === productName)
        
        if (existingProduct !== -1) {
            cart[existingProduct].quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: parseInt(productPrice), image: productImg, quantity: 1})
        }
        
        localStorage.setItem('cart', JSON.stringify(cart))
        displayCart()
    }

    document.querySelectorAll('.btn-add-toCart').forEach(button => {
        button.addEventListener('click', function () {
            const productElement = this.closest('.content')
            const productId = productElement.getAttribute('data-id')
            const productName = productElement.getAttribute('data-name')
            const productPrice = productElement.getAttribute('data-price')
            const productImg = productElement.getAttribute('data-img')

            addToCart(productId, productName, productPrice, productImg)
        })
    })

    displayCart()
})

function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.splice(index, 1); // Hapus item berdasarkan index
    localStorage.setItem('cart', JSON.stringify(cart))
    displayCart()
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const cartContainer = document.querySelector('.shopping-cart')
    const totalPricelement = document.getElementById('total')

    let totalPrice = 0

    cartContainer.innerHTML = ''

    if(cart === 0) {
        cartContainer.innerHTML = '<p>Keranjang kosong</p>'
    } else {
        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="imgCoffe/${ item.image }" alt="${ item.image }" />
                <div class="item-detail">
                    <h3>${ item.name }</h3>
                    <div class="item-price">${ item.price }</div>
                </div>
                <i class="fa-solid fa-trash remove-item" onclick="removeCartItem(${ index })"></i>

                <div class="product-quantity">
                    <i class="fa-solid fa-plus" onclick="increaseQuantity(${ index })"></i>
                </br>
                <span class="quantity">${ item.quantity }</span>
                </br>
                <i class="fa-solid fa-minus" onclick="decreaseQuantity(${ index })"></i>
                </div>
            </div>
            `

            totalPrice += item.price * item.quantity
        })

        totalPricelement.innerText = totalPrice

        
        localStorage.setItem('total', totalPrice)
    }
}

displayCart()

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart[index].quantity += 1

    localStorage.setItem('cart', JSON.stringify(cart))
    displayCart()
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart[index].quantity -= 1

    localStorage.setItem('cart', JSON.stringify(cart))
    displayCart()
}



document.getElementById('btnPesan').addEventListener('click', (btn) => {
    
})

