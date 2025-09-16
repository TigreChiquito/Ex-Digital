// Función para actualizar el contador del carrito
function updateCartCounter() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const counter = document.getElementById("cart-counter");
    
    if (counter) {
        const uniqueItems = carrito.length; // Cuenta elementos únicos (diferentes productos)
        counter.textContent = uniqueItems;
        counter.setAttribute('data-count', uniqueItems);
        
        // Opcional: ocultar si es 0
        if (uniqueItems === 0) {
            counter.style.display = 'none';
        } else {
            counter.style.display = 'flex';
        }
    }
}

// Actualizar contador al cargar la página
document.addEventListener('DOMContentLoaded', updateCartCounter);

// Actualizar contador cuando cambie el localStorage (para sincronizar entre páginas)
window.addEventListener('storage', function(e) {
    if (e.key === 'carrito') {
        updateCartCounter();
    }
});