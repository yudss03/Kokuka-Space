let activePage = document.querySelector('.page.active');

function loadContent(pageId, event) {
    event.preventDefault()
    // Sembunyikan halaman aktif saat ini
    if (activePage) {
        activePage.style.display = 'none';
        activePage.classList.remove('active');
    }

    // Tampilkan halaman baru yang dipilih
    activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.style.display = 'block';
        activePage.classList.add('active');
    }
}