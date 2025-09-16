document.getElementById("login").addEventListener("submit", function(e) {
    e.preventDefault();

    let correoIngresado = document.getElementById("correo").value;
    let contraseñaIngresada = document.getElementById("contraseña").value;

    let correoGuardado = localStorage.getItem("correo");
    let contraseñaGuardada = localStorage.getItem("contraseña");

    if (correoIngresado === correoGuardado && contraseñaIngresada === contraseñaGuardada) {
        alert("Inicio de sesión exitoso!");
        window.location.href = "index.html"; // redirige al home
    } else {
        alert("Correo o contraseña incorrectos");
    }
});