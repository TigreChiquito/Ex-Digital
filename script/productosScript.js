const productos = [
    {nombre: "Producto 1", precio: 10000, img: "img/utilidades/sv_ex_logo_4c_vector-1.webp", descripcion: "Descripción detallada del Producto 1."},
    {nombre: "Producto 2", precio: 15000, img: "img/productos/K65_PLUS_WIRELESS_01.avif", descripcion: "Descripción detallada del Producto 2."},
    {nombre: "Producto 3", precio: 12500, img: "img/productos/producto3.jpg", descripcion: "Descripción detallada del Producto 3."},
    {nombre: "Producto 4", precio: 18000, img: "img/productos/producto4.jpg", descripcion: "Descripción detallada del Producto 4."},
    {nombre: "Producto 5", precio: 9500, img: "img/productos/producto5.jpg", descripcion: "Descripción detallada del Producto 5."},
    {nombre: "Producto 6", precio: 20000, img: "img/productos/producto6.jpg", descripcion: "Descripción detallada del Producto 6."},
    {nombre: "Producto 7", precio: 14000, img: "img/productos/producto7.jpg", descripcion: "Descripción detallada del Producto 7."},
    {nombre: "Producto 8", precio: 11500, img: "img/productos/producto8.jpg", descripcion: "Descripción detallada del Producto 8."}
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