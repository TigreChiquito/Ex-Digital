// Obtener carrito del localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderCarrito() {
    const carritoBody = document.getElementById("carrito-body");
    carritoBody.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        let fila = `
        <tr>
            <td>${item.nombre}</td>
            <td><img src="${item.img}" width="70" class="rounded shadow"></td>
            <td>$${item.precio.toLocaleString()}</td>
            <td>
                <div class="quantity-container-cart">
                    <button type="button" class="quantity-btn-cart decrease-btn" data-index="${index}">−</button>
                    <input type="number" min="1" value="${item.cantidad}" class="form-control cantidad-input" data-index="${index}" readonly>
                    <button type="button" class="quantity-btn-cart increase-btn" data-index="${index}">+</button>
                </div>
            </td>
            <td>$${subtotal.toLocaleString()}</td>
            <td>
                <button class="btn btn-danger btn-sm eliminar" data-index="${index}">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>
        `;
        carritoBody.innerHTML += fila;
    });

    document.getElementById("total").textContent = `Total: $${total.toLocaleString()}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Actualizar estado de botones después de renderizar
    updateAllQuantityButtons();
}

// Función para actualizar el estado de los botones de cantidad
function updateQuantityButtonsForRow(index) {
    const decreaseBtn = document.querySelector(`.decrease-btn[data-index="${index}"]`);
    const increaseBtn = document.querySelector(`.increase-btn[data-index="${index}"]`);
    const cantidadInput = document.querySelector(`.cantidad-input[data-index="${index}"]`);
    
    if (decreaseBtn && increaseBtn && cantidadInput) {
        const cantidad = parseInt(cantidadInput.value);
        const maxCantidad = 99; // Límite máximo
        
        // Deshabilitar botón de disminuir si la cantidad es 1
        decreaseBtn.disabled = cantidad <= 1;
        
        // Deshabilitar botón de aumentar si se alcanza el máximo
        increaseBtn.disabled = cantidad >= maxCantidad;
    }
}

// Actualizar todos los botones de cantidad
function updateAllQuantityButtons() {
    carrito.forEach((item, index) => {
        updateQuantityButtonsForRow(index);
    });
}

// Eliminar producto
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("eliminar") || e.target.closest('.eliminar')) {
        let index = e.target.dataset.index || e.target.closest('.eliminar').dataset.index;
        carrito.splice(index, 1);
        renderCarrito();
        updateCartCounter();
    }
    
    // Manejar botones de cantidad
    if (e.target.classList.contains("decrease-btn")) {
        let index = parseInt(e.target.dataset.index);
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
            renderCarrito();
            updateCartCounter();
        }
    }
    
    if (e.target.classList.contains("increase-btn")) {
        let index = parseInt(e.target.dataset.index);
        const maxCantidad = 99;
        if (carrito[index].cantidad < maxCantidad) {
            carrito[index].cantidad += 1;
            renderCarrito();
            updateCartCounter();
        }
    }
});

// Cambiar cantidad mediante input (mantener funcionalidad existente como backup)
document.addEventListener("input", function(e) {
    if (e.target.classList.contains("cantidad-input")) {
        let index = e.target.dataset.index;
        let nuevaCantidad = parseInt(e.target.value);
        
        // Validar cantidad
        if (nuevaCantidad >= 1 && nuevaCantidad <= 99) {
            carrito[index].cantidad = nuevaCantidad;
            renderCarrito();
            updateCartCounter();
        }
    }
});

// Función para mostrar carrito vacío
function mostrarCarritoVacio() {
    const container = document.getElementById("table-container");
    container.innerHTML = `
        <div class="carrito-vacio">
            <i class="bi bi-cart-x" style="font-size: 4rem; color: #6c757d; margin-bottom: 20px;"></i>
            <h3>Tu carrito está vacío</h3>
            <p>¡Agrega algunos productos increíbles a tu carrito!</p>
            <a href="index.html" class="btn">
                <i class="bi bi-arrow-left"></i> Continuar Comprando
            </a>
        </div>
    `;
}

// Renderizar carrito o mostrar vacío
function inicializarCarrito() {
    if (carrito.length === 0) {
        mostrarCarritoVacio();
    } else {
        renderCarrito();
    }
}

// Inicializar cuando carga la página
inicializarCarrito();