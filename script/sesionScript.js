// Función para actualizar el contador del carrito
function updateCartCounter() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const counter = document.getElementById("cart-counter");
    
    if (counter) {
        const uniqueItems = carrito.length;
        counter.textContent = uniqueItems;
        counter.setAttribute('data-count', uniqueItems);
        
        if (uniqueItems === 0) {
            counter.style.display = 'none';
        } else {
            counter.style.display = 'flex';
        }
    }
}

// Función para actualizar el navbar según el estado de sesión
function updateNavbar() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const navbarAuthSection = document.querySelector('.navbar-nav.ms-auto');
    
    if (usuarioLogueado) {
        // Usuario logueado - mostrar info del usuario y botón cerrar sesión
        navbarAuthSection.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle me-2"></i>
                    <span class="user-name">${usuarioLogueado.nombre || usuarioLogueado.email}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><h6 class="dropdown-header">Bienvenido</h6></li>
                    <li><span class="dropdown-item-text text-muted small">${usuarioLogueado.email}</span></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Mi Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-bag me-2"></i>Mis Pedidos</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item text-danger" id="cerrarSesion"><i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión</button></li>
                </ul>
            </li>
        `;
    } else {
        // Usuario no logueado - mostrar botones de login y registro
        navbarAuthSection.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="login.html">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="registro.html">Registro</a>
            </li>
        `;
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar datos de sesión
    localStorage.removeItem("usuarioLogueado");
    
    // Mostrar mensaje de confirmación
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="bi bi-check-circle-fill text-success me-2"></i>
            <span>Sesión cerrada correctamente</span>
        </div>
    `;
    document.body.appendChild(toast);
    
    // Animar la aparición del toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remover el toast después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
    
    // Actualizar navbar
    updateNavbar();
    
    // Redireccionar a inicio después de un momento
    setTimeout(() => {
        if (window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('index.html')) {
            window.location.href = 'index.html';
        }
    }, 1500);
}

// Función para inicializar sesión (llamar desde login.html cuando el login sea exitoso)
function iniciarSesion(datosUsuario) {
    localStorage.setItem("usuarioLogueado", JSON.stringify(datosUsuario));
    updateNavbar();
    
    // Mostrar mensaje de bienvenida
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="bi bi-check-circle-fill text-success me-2"></i>
            <span>¡Bienvenido ${datosUsuario.nombre || datosUsuario.email}!</span>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
    updateNavbar();
});

// Manejar clics en el navbar (delegación de eventos)
document.addEventListener('click', function(e) {
    if (e.target.id === 'cerrarSesion' || e.target.closest('#cerrarSesion')) {
        e.preventDefault();
        cerrarSesion();
    }
});

// Actualizar contador cuando cambie el localStorage
window.addEventListener('storage', function(e) {
    if (e.key === 'carrito') {
        updateCartCounter();
    }
    if (e.key === 'usuarioLogueado') {
        updateNavbar();
    }
});

// Función auxiliar para verificar si el usuario está logueado
function estaLogueado() {
    return localStorage.getItem("usuarioLogueado") !== null;
}

// Función para obtener datos del usuario logueado
function obtenerUsuarioLogueado() {
    const usuario = localStorage.getItem("usuarioLogueado");
    return usuario ? JSON.parse(usuario) : null;
}