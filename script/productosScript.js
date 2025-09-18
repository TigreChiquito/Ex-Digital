99    // Cambiar orden de productos para que quede estetico y agregar imagenes 2 y 3
    const productos = [
    {nombre: "CA-9011379", precio: 10000, img: "img/productos/CA-9011379-WW_01.avif", img2: "img/productos/g213-gallery-1-nb.webp",descripcion: "Auriculares gaming de alta calidad con micrófono integrado y sonido envolvente. Perfectos para largas sesiones de juego.."},
    {nombre: "G213", precio: 15000, img: "img/productos/g213-gallery-1-nb.webp", descripcion: "Teclado gamer retroiluminado con teclas resistentes y rápidas. Ideal para mejorar tu rendimiento en cada partida."},
    {nombre: "G513", precio: 12500, img: "img/productos/g513-carbon-gallery-2.webp", descripcion: "Teclado mecánico premium con switches de alta precisión y reposamuñecas ergonómico. Rendimiento y comodidad en uno."},
    {nombre: "G915", precio: 18000, img: "img/productos/g915-x-wireless-mechanical-gaming-keyboard-gallery-1-us.webp", descripcion: "Teclado inalámbrico de perfil bajo con iluminación RGB y batería de larga duración. Estilo y rendimiento profesional."},
    {nombre: "K65", precio: 9500, img: "img/productos/K65_PLUS_WIRELESS_01.avif", descripcion: "Teclado compacto mecánico con retroiluminación brillante. Portátil y perfecto para gamers que necesitan movilidad."},
    {nombre: "M75", precio: 20000, img: "img/productos/M75_AIR_LIGHT_GRAY_01.avif", descripcion: "Mouse gamer de última generación con sensor de alta precisión y diseño ergonómico. Control absoluto en cada movimiento."},
    {nombre: "MAKR75", precio: 14000, img: "img/productos/makr75-front.avif", descripcion: "Teclado mecánico personalizable con diseño compacto. Ideal para quienes buscan estilo, comodidad y velocidad."},
    {nombre: "VIRTUOSO_MAX", precio: 11500, img: "img/productos/VIRTUOSO_MAX_WIRELESS_CRBN_01.avif", descripcion: "Auriculares inalámbricos premium con sonido de alta fidelidad y micrófono desmontable. Experiencia inmersiva total."},
    {nombre: "M4Xy", precio: 20500, img: "img/productos/pro-x-tkl-rapid-black-gallery-1-us.webp", descripcion: "Teclado mecánico versátil con retroiluminación RGB y diseño robusto. Rendimiento confiable para trabajo y gaming."},
    {nombre: "M454", precio: 30500, img: "img/productos/SCIMITAR_ELITE_SE_BLK-YLO_01.avif", descripcion: "Mouse gamer con múltiples botones programables, sensor de alta precisión y diseño ergonómico. Hecho para los más competitivos."},
    {nombre: "G34", precio: 41500, img: "img/productos/pro-x-tkl-rapid-black-gallery-1-us.webp", descripcion: "Teclado premium con switches de respuesta rápida, retroiluminación personalizable y construcción duradera. Rendimiento profesional."},
    {nombre: "K99", precio: 25500, img: "img/productos/g513-carbon-gallery-2.webp", descripcion: "Teclado económico con diseño compacto y funcional. Ideal para quienes buscan practicidad a bajo costo"}
    ];

    const container = document.getElementById("productosContainer");
    const modal = new bootstrap.Modal(document.getElementById('detalleModal'));
    let productoSeleccionado = {};

    // Generar cards de productos
    productos.forEach((prod, index) => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
    <div class="card h-100">
        <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body text-center">
        <h5 class="card-title">${prod.nombre}</h5>
        <p class="card-text">$${prod.precio.toLocaleString()}</p>
        <button class="btn btn-dark agregar" data-index="${index}">Agregar al carrito</button>
        </div>
    </div>
    `;
    container.appendChild(col);
    });

    // Manejo del modal
    document.addEventListener("click", (e) => {
    if(e.target.classList.contains("agregar")){
    const index = e.target.dataset.index;
    productoSeleccionado = productos[index];

    document.getElementById("modalNombre").textContent = productoSeleccionado.nombre;
    document.getElementById("modalImg").src = productoSeleccionado.img;
    document.getElementById("modalImg2").src = productoSeleccionado.img2;
    document.getElementById("modalDescripcion").textContent = productoSeleccionado.descripcion;
    document.getElementById("modalPrecio").textContent = `$${productoSeleccionado.precio.toLocaleString()}`;
    document.getElementById("modalCantidad").value = 1;

    modal.show();
    }
    });

    // Confirmar agregar al carrito
    document.getElementById("confirmarAgregar").addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("modalCantidad").value);
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(item => item.nombre === productoSeleccionado.nombre);
    if(index !== -1){
    carrito[index].cantidad += cantidad;
    } else {
    carrito.push({...productoSeleccionado, cantidad});
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    modal.hide();
    alert(`${productoSeleccionado.nombre} agregado al carrito`);
    });

    // Funcionalidad para botones de cantidad
document.getElementById("decreaseBtn").addEventListener("click", () => {
    const cantidadInput = document.getElementById("modalCantidad");
    let cantidad = parseInt(cantidadInput.value);
    if (cantidad > 1) {
        cantidadInput.value = cantidad - 1;
        updateQuantityButtons();
    }
});

document.getElementById("increaseBtn").addEventListener("click", () => {
    const cantidadInput = document.getElementById("modalCantidad");
    let cantidad = parseInt(cantidadInput.value);
    const maxCantidad = parseInt(cantidadInput.getAttribute("max")) || 99;
    if (cantidad < maxCantidad) {
        cantidadInput.value = cantidad + 1;
        updateQuantityButtons();
    }
});

// Función para actualizar el estado de los botones
function updateQuantityButtons() {
    const cantidadInput = document.getElementById("modalCantidad");
    const decreaseBtn = document.getElementById("decreaseBtn");
    const increaseBtn = document.getElementById("increaseBtn");
    const cantidad = parseInt(cantidadInput.value);
    const maxCantidad = parseInt(cantidadInput.getAttribute("max")) || 99;
    
    // Deshabilitar botón de disminuir si la cantidad es 1
    decreaseBtn.disabled = cantidad <= 1;
    
    // Deshabilitar botón de aumentar si se alcanza el máximo
    increaseBtn.disabled = cantidad >= maxCantidad;
}

// También actualiza tu función existente de manejo del modal
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("agregar")){
        const index = e.target.dataset.index;
        productoSeleccionado = productos[index];

        document.getElementById("modalNombre").textContent = productoSeleccionado.nombre;
        document.getElementById("modalImg").src = productoSeleccionado.img;
        document.getElementById("modalImg2").src = productoSeleccionado.img2 || productoSeleccionado.img;
        document.getElementById("modalDescripcion").textContent = productoSeleccionado.descripcion;
        document.getElementById("modalPrecio").textContent = `$${productoSeleccionado.precio.toLocaleString()}`;
        document.getElementById("modalCantidad").value = 1;

        // Actualizar estado de botones cuando se abre el modal
        updateQuantityButtons();

        modal.show();
    }
});