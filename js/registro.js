document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-registro');

  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/;
  const regexEmailDuoc = /^[a-zA-Z0-9._%+-]+@duoc\.cl$/i;
  const regexTelefono = /^[0-9]{8,15}$/;

  function mostrarError(inputId, errorId, mensaje) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(errorId);

    if (mensaje) {
      input.classList.add('input-error');
      errorSpan.textContent = mensaje;
      errorSpan.classList.add('active');
    } else {
      input.classList.remove('input-error');
      errorSpan.textContent = '';
      errorSpan.classList.remove('active');
    }
  }

  function validarPassword(pwd) {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[@#$%!^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)
    );
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let esValido = true;

    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
      mostrarError('nombre', 'error-nombre', 'El nombre es obligatorio.');
      esValido = false;
    } else if (!regexNombre.test(nombre)) {
      mostrarError('nombre', 'error-nombre', 'Solo letras y espacios (máx 50).');
      esValido = false;
    } else {
      mostrarError('nombre', 'error-nombre', '');
    }

    const email = document.getElementById('email').value.trim();
    if (!email) {
      mostrarError('email', 'error-email', 'El correo es obligatorio.');
      esValido = false;
    } else if (!regexEmailDuoc.test(email)) {
      mostrarError('email', 'error-email', 'Debe ser un correo institucional @duoc.cl.');
      esValido = false;
    } else {
      mostrarError('email', 'error-email', '');
    }

    const password = document.getElementById('password').value;
    if (!password) {
      mostrarError('password', 'error-password', 'La contraseña es obligatoria.');
      esValido = false;
    } else if (!validarPassword(password)) {
      mostrarError('password', 'error-password', 'Debe tener min. 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.');
      esValido = false;
    } else {
      mostrarError('password', 'error-password', '');
    }

    const confirmPassword = document.getElementById('confirm-password').value;
    if (confirmPassword !== password || !confirmPassword) {
      mostrarError('confirm-password', 'error-confirm-password', 'Las contraseñas no coinciden.');
      esValido = false;
    } else {
      mostrarError('confirm-password', 'error-confirm-password', '');
    }

    const telefono = document.getElementById('telefono').value.trim();
    if (telefono && !regexTelefono.test(telefono)) {
      mostrarError('telefono', 'error-telefono', 'Ingrese un teléfono válido.');
      esValido = false;
    } else {
      mostrarError('telefono', 'error-telefono', '');
    }

    if (esValido) {
      // 1. Validar unicidad del correo en localStorage (vía storage.js)
      if (typeof esCorreoUnico === 'function' && !esCorreoUnico(email)) {
        mostrarError('email', 'error-email', 'El correo electrónico ya se encuentra registrado.');
        return;
      }

      // 2. Obtener lista de mascotas ingresadas (vía mascotas.js)
      const mascotas = typeof obtenerMascotasIngresadas === 'function' 
        ? obtenerMascotasIngresadas() 
        : [];

      // 3. Crear objeto de usuario
      const nuevoUsuario = {
        nombre,
        correo: email,
        password,
        telefono,
        mascotas,
        fechaRegistro: new Date().toISOString()
      };

      // 4. Guardar en localStorage (vía storage.js)
      let guardadoExitoso = false;
      if (typeof guardarUsuario === 'function') {
        guardadoExitoso = guardarUsuario(nuevoUsuario);
      } else {
        // Fallback en caso de no haber cargado storage.js
        const usuarios = JSON.parse(localStorage.getItem('guau_miau_usuarios') || '[]');
        usuarios.push(nuevoUsuario);
        localStorage.setItem('guau_miau_usuarios', JSON.stringify(usuarios));
        guardadoExitoso = true;
      }

      if (guardadoExitoso) {
        const registroMsg = document.getElementById('registroMessage');
        if (registroMsg) {
          registroMsg.textContent = '¡Registro completado con éxito! Redirigiendo al inicio de sesión...';
          registroMsg.className = 'login-message message-success';
        }

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        const registroMsg = document.getElementById('registroMessage');
        if (registroMsg) {
          registroMsg.textContent = 'Hubo un error al guardar el registro. Inténtelo nuevamente.';
          registroMsg.className = 'login-message message-error';
        }
      }
    }
  });
});