
let nombreGuardado = localStorage.getItem("nombre");
let correoGuardado = localStorage.getItem("correo");


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

    if (mensaje.length > 500) {
        alert("El comentario no debe exceder los 500 caracteres.");
        return;  
    }


    let correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoRegex.test(correoIngresado)) {
        alert("Por favor, ingresa un correo válido.");
        return;
    }

  
    alert("Mensaje enviado con éxito. ¡Gracias por contactarnos!");
    
   
    document.getElementById("mensaje").value = "";
});
