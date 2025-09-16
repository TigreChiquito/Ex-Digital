document.getElementById("registro").addEventListener("submit", function(e) {
    e.preventDefault(); 
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let contraseña = document.getElementById("contraseña").value;
    let confirmar = document.getElementById("confirmar-contraseña").value;

    if (contraseña !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Guardar datos en localStorage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("correo", correo);
    localStorage.setItem("contraseña", contraseña);

    alert("Registro exitoso!");

    // Redirigir a login
    window.location.href = "login.html";
});