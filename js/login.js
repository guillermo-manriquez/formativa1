
function obtenerUsuariosParaLogin() {

    if (typeof obtenerUsuarios === "function") {
        return obtenerUsuarios();
    }

    const datos = localStorage.getItem("guau_miau_usuarios") || localStorage.getItem("usuarios");

    if (!datos) {
        return [];
    }

    try {
        return JSON.parse(datos);
    } catch (error) {
        console.error("Error al leer usuarios:", error);
        return [];
    }
}



const loginForm = document.getElementById("loginForm");

const correoInput = document.getElementById("correo");
const passwordInput = document.getElementById("password");

const correoError = document.getElementById("correoError");
const passwordError = document.getElementById("passwordError");

const loginMessage = document.getElementById("loginMessage");


loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    correoError.textContent = "";
    passwordError.textContent = "";
    loginMessage.textContent = "";

    loginMessage.className = "login-message";


    const correo = correoInput.value.trim();
    const password = passwordInput.value;


    let formularioValido = true;


    if (correo === "") {

        correoError.textContent =
            "El correo electrónico es obligatorio.";

        formularioValido = false;
    }


    if (password === "") {

        passwordError.textContent =
            "La contraseña es obligatoria.";

        formularioValido = false;
    }


    if (!formularioValido) {
        return;
    }


    const usuarios = obtenerUsuariosParaLogin();

    const usuarioEncontrado = usuarios.find(function(usuario) {

        return usuario.correo &&
               usuario.correo.toLowerCase() === correo.toLowerCase();

    });


    if (!usuarioEncontrado) {

        loginMessage.textContent =
            "Correo no registrado.";

        loginMessage.classList.add("message-error");

        return;
    }


    if (usuarioEncontrado.password !== password) {

        loginMessage.textContent =
            "Contraseña incorrecta.";

        loginMessage.classList.add("message-error");

        return;
    }

    loginMessage.textContent =
        "Inicio de sesión exitoso.";

    loginMessage.classList.add("message-success");



    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioEncontrado)
    );


});


const btnRecuperar =
    document.getElementById("btnRecuperar");

const recuperarModal =
    document.getElementById("recuperarModal");

const cerrarModal =
    document.getElementById("cerrarModal");



btnRecuperar.addEventListener("click", function() {

    recuperarModal.classList.add("active");

});


cerrarModal.addEventListener("click", function() {

    recuperarModal.classList.remove("active");

});


recuperarModal.addEventListener("click", function(event) {

    if (event.target === recuperarModal) {

        recuperarModal.classList.remove("active");

    }

});


const recuperarForm =
    document.getElementById("recuperarForm");

const correoRecuperacion =
    document.getElementById("correoRecuperacion");

const recuperacionError =
    document.getElementById("recuperacionError");

const recuperacionMessage =
    document.getElementById("recuperacionMessage");


recuperarForm.addEventListener("submit", function(event) {

    event.preventDefault();

    recuperacionError.textContent = "";
    recuperacionMessage.textContent = "";

    recuperacionMessage.className =
        "login-message";


    const correo =
        correoRecuperacion.value.trim();


    if (correo === "") {

        recuperacionError.textContent =
            "Debes ingresar tu correo electrónico.";

        return;
    }


    const usuarios =
        obtenerUsuariosParaLogin();


    const usuarioEncontrado =
        usuarios.find(function(usuario) {

            return usuario.correo &&
                usuario.correo.toLowerCase() ===
                correo.toLowerCase();

        });


    if (!usuarioEncontrado) {

        recuperacionMessage.textContent =
            "No existe una cuenta asociada a este correo.";

        recuperacionMessage.classList.add(
            "message-error"
        );

        return;
    }


    recuperacionMessage.textContent =
        "Solicitud recibida. Revisa las instrucciones " +
        "de recuperación de acceso.";

    recuperacionMessage.classList.add(
        "message-success"
    );

});
