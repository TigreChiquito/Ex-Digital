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
            <input type="number" min="1" value="${item.cantidad}" class="form-control cantidad-input" data-index="${index}">
            </td>
            <td>$${subtotal.toLocaleString()}</td>
            <td>
            <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
            </td>
        </tr>
        `;
        carritoBody.innerHTML += fila;
    });

    document.getElementById("total").textContent = `Total: $${total.toLocaleString()}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Eliminar producto
    document.addEventListener("click", function(e) {
    if (e.target.classList.contains("eliminar")) {
        let index = e.target.dataset.index;
        carrito.splice(index, 1);
        renderCarrito();
        updateCartCounter();
    }
    });

    // Cambiar cantidad
    document.addEventListener("input", function(e) {
    if (e.target.classList.contains("cantidad-input")) {
        let index = e.target.dataset.index;
        carrito[index].cantidad = parseInt(e.target.value);
        renderCarrito();
    }
    });

    renderCarrito();