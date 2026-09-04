// Clave principal para localStorage
const STORAGE_KEY_USUARIOS = 'guau_miau_usuarios';

/**
 * Obtiene la lista completa de usuarios guardados.
 * @returns {Array} Lista de usuarios o arreglo vacío si no existen.
 */
function obtenerUsuarios() {
  const datos = localStorage.getItem(STORAGE_KEY_USUARIOS);
  return datos ? JSON.parse(datos) : [];
}

/**
 * Verifica si un correo ya existe en el sistema.
 * @param {string} correo - Correo a verificar.
 * @returns {boolean} True si el correo ya está registrado, False en caso contrario.
 */
function esCorreoUnico(correo) {
  const usuarios = obtenerUsuarios();
  const correoLimpio = correo.trim().toLowerCase();
  
  return !usuarios.some(user => user.correo.toLowerCase() === correoLimpio);
}

/**
 * Guarda un nuevo usuario con su lista de mascotas en localStorage.
 * @param {Object} usuarioData - Datos del usuario (nombre, correo, contraseña, teléfono, mascotas).
 * @returns {boolean} Resultado de la operación.
 */
function guardarUsuario(usuarioData) {
  if (!esCorreoUnico(usuarioData.correo)) {
    console.error('El correo electrónico ya se encuentra registrado.');
    return false;
  }

  const usuarios = obtenerUsuarios();
  usuarios.push(usuarioData);

  localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(usuarios));
  return true;
}

/**
 * Autentica las credenciales ingresadas en el Login.
 * @param {string} correo 
 * @param {string} password 
 * @returns {Object} Objeto con resultado del intento { exito: boolean, mensaje: string, usuario: Object|null }
 */
function autenticarUsuario(correo, password) {
  const usuarios = obtenerUsuarios();
  const correoLimpio = correo.trim().toLowerCase();

  const usuarioEncontrado = usuarios.find(u => u.correo.toLowerCase() === correoLimpio);

  if (!usuarioEncontrado) {
    return { exito: false, mensaje: 'Correo no registrado.' };
  }

  if (usuarioEncontrado.password !== password) {
    return { exito: false, mensaje: 'Contraseña incorrecta.' };
  }

  return { exito: true, mensaje: 'Inicio de sesión exitoso.', usuario: usuarioEncontrado };
}