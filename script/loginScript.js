document.getElementById("login").addEventListener("submit", function(e) {
    e.preventDefault();

    let correoIngresado = document.getElementById("correo").value;
    let contraseñaIngresada = document.getElementById("contraseña").value;

    let correoGuardado = localStorage.getItem("correo");
    let contraseñaGuardada = localStorage.getItem("contraseña");

    if (correoIngresado === correoGuardado && contraseñaIngresada === contraseñaGuardada) {
        alert("Inicio de sesión exitoso!");
        
        // 🔹 Guardar sesión activa
        localStorage.setItem("usuarioLogueado", JSON.stringify({
            correo: correoIngresado
        }));

        // 🔹 Redirigir al home
        window.location.href = "../index.html"; 
    } else {
        alert("Correo o contraseña incorrectos");
    }
});
