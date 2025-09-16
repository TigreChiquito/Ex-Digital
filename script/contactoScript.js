    // Obtener datos guardados en localStorage
    let nombreGuardado = localStorage.getItem("nombre");
    let correoGuardado = localStorage.getItem("correo");

    if (!nombreGuardado || !correoGuardado) {
    alert("Debes iniciar sesión para acceder a Contacto.");
    window.location.href = "login.html";
    } else {
    document.getElementById("nombre").value = nombreGuardado;
    document.getElementById("correo").value = correoGuardado;
    }

    // Manejar envío del formulario
    document.getElementById("contacto").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombreIngresado = document.getElementById("nombre").value.trim();
    let correoIngresado = document.getElementById("correo").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();

    if (nombreIngresado !== nombreGuardado || correoIngresado !== correoGuardado) {
        alert("Los datos ingresados no coinciden con tu registro.");
        return;
    }

    if (mensaje === "") {
        alert("Debes escribir un mensaje antes de enviar.");
        return;
    }

    alert("Mensaje enviado con éxito. ¡Gracias por contactarnos!");
    document.getElementById("mensaje").value = "";
    });