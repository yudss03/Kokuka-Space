const hamburgerBtn = document.querySelector('.hamburger-menu .hamburger-icon i')
const closeSideBtn = document.querySelector('.close-sidebar-btn i')

const navbar = document.querySelector('.navbar')

hamburgerBtn.addEventListener('click', function(e) {
    navbar.classList.toggle('active')
    e.preventDefault()
})

closeSideBtn.addEventListener('click', function(e) {
    sidebar.classList.add('active')
    e.preventDefault()
})

window.onscroll(() => {
    sidebar.classList.add('active')
})

//tonggle classs active sc

// document.querySelector("#shopping-cart-button").onclick = (e) => {
//     shoppingCart.classList.toggle("active");
//     navbar.classList.remove("active");
//     search.classList.remove("active");
//     e.preventDefault();
// };

shoppingCart.addEventListener('click', (e) => {
    shoppingCart.classList.toggle("active");
    navbar.classList.remove("active");
    search.classList.remove("active");
    e.preventDefault()
})

window.onscroll = () => {
    navbar.classList.remove("active");
    search.classList.remove("active");
    shoppingCart.classList.remove("active");
};

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0);
});

const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };
});

document.querySelector(".modal .close-icon").onclick = (e) => {
    itemDetailModal.style.display = "none";
    e.preventDefault();
}

window.onclick = (e) => {
    if (e.target === itemDetailModal){
    itemDetailModal.style.display = 'none';
    }
};

// function showOnly() {
//     const ids = ['301','302','303','304','305','306','307','308','309','310'];
//     var searchKey = 'search.php?key=latte';
//     var id = [];

//     // Membuat permintaan HTTP ke file PHP
//     fetch(searchKey)
//         .then(response => response.text())
//         .then(data => {
//             // Mengubah data string menjadi array
//             id = data.split(',').map(Number); // Mengonversi elemen ke angka jika diperlukan
//             console.log(id); // Output ke konsol
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
    
//     ids.forEach(id => {
//         const element = document.getElementById(id);
//         element.style.display = (id === ids) ? 'block' : 'none';
//     });
// }