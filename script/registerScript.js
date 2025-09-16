document.getElementById("registro").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let contraseña = document.getElementById("contraseña").value;
    let confirmar = document.getElementById("confirmar-contraseña").value;

    // Validación de campos vacíos
    if (!nombre || !correo || !contraseña || !confirmar) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Validación de que las contraseñas coincidan
    if (contraseña !== confirmar) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Validación de la longitud de la contraseña (4 a 10 caracteres)
    if (contraseña.length < 4 || contraseña.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
    }

    // Validación de correo con expresión regular para los dominios permitidos
    let correoRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!correoRegex.test(correo)) {
        alert("El correo debe ser con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        return;
    }

    // Guardar los datos en localStorage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("correo", correo);
    localStorage.setItem("contraseña", contraseña);

    alert("¡Registro exitoso!");

    // Redirigir a la página de login
    window.location.href = "login.html";
});
