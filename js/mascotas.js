// Manejo dinámico de interfaz para la sección de Mascotas

document.addEventListener('DOMContentLoaded', () => {
  const btnAgregar = document.getElementById('btn-agregar-mascota');
  const contenedor = document.getElementById('contenedor-mascotas');

  if (btnAgregar && contenedor) {
    // Escucha el evento del botón "+ Añadir Mascota"
    btnAgregar.addEventListener('click', () => agregarCampoMascota(contenedor));

    // Agregar un primer bloque por defecto
    agregarCampoMascota(contenedor);
  }
});

/**
 * Crea e inyecta dinámicamente el bloque HTML para una mascota.
 */
function agregarCampoMascota(contenedor) {
  const tarjeta = document.createElement('div');
  tarjeta.classList.add('mascota-card');

  tarjeta.innerHTML = `
    <div class="form-group">
      <label>Nombre de la Mascota *</label>
      <input 
        type="text" 
        class="mascota-nombre" 
        placeholder="Ej. Pelusa" 
        maxlength="50" 
        required 
      />
    </div>
    
    <div class="form-group">
      <label>Tipo de Mascota *</label>
      <select class="mascota-tipo" required>
        <option value="" disabled selected>-- Selecciona un tipo --</option>
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
        <option value="Ave">Ave</option>
        <option value="Otro">Otro</option>
      </select>
    </div>

    <button type="button" class="btn-eliminar-mascota">Eliminar</button>
  `;

  // Listener para el botón de eliminar de esta tarjeta específica
  const btnEliminar = tarjeta.querySelector('.btn-eliminar-mascota');
  btnEliminar.addEventListener('click', () => tarjeta.remove());

  contenedor.appendChild(tarjeta);
}

/**
 * Recolecta las mascotas ingresadas en el DOM y las devuelve como un arreglo de objetos.
 * @returns {Array<{tipo: string, nombre: string}>}
 */
function obtenerMascotasIngresadas() {
  const tarjetas = document.querySelectorAll('.mascota-card');
  const mascotas = [];

  tarjetas.forEach(tarjeta => {
    const nombreInput = tarjeta.querySelector('.mascota-nombre');
    const tipoSelect = tarjeta.querySelector('.mascota-tipo');

    if (nombreInput.value.trim() !== '' && tipoSelect.value !== '') {
      mascotas.push({
        nombre: nombreInput.value.trim(),
        tipo: tipoSelect.value
      });
    }
  });

  return mascotas;
}