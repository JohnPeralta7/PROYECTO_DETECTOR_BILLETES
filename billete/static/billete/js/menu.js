function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const toggle = document.getElementById('menuToggle');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    toggle.classList.toggle('active');
}

function closeMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const toggle = document.getElementById('menuToggle');

    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    toggle.classList.remove('active');
}

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('menuToggle');
    const overlay = document.getElementById('overlay');
    
    // Si el menú está abierto y se hace clic fuera de él
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(event.target) && 
        !toggle.contains(event.target) &&
        event.target !== overlay) {
        closeMenu();
    }
});

// Cerrar menú con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// Prevenir que los clics dentro del menú lo cierren
document.querySelector('.sidebar').addEventListener('click', function(event) {
    event.stopPropagation();
});