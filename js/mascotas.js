<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Gestión de Mascotas</title>
  <style>
    .mascota-item {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    .btn-eliminar {
      background-color: #ff4d4d;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <h2>Mascotas Registradas</h2>
  
  <div id="contenedor-mascotas"></div>

  <button type="button" id="btn-agregar">+ Añadir Mascota</button>

  <script>
    const contenedor = document.getElementById('contenedor-mascotas');
    const btnAgregar = document.getElementById('btn-agregar');

    function crearMascota() {
      const div = document.createElement('div');
      div.classList.add('mascota-item');

      // Select de Tipo de Mascota
      const selectTipo = document.createElement('select');
      selectTipo.name = 'tipo_mascota[]';
      selectTipo.required = true;
      
      const opciones = ['Perro', 'Gato', 'Ave', 'Otro'];
      opciones.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.toLowerCase();
        option.textContent = tipo;
        selectTipo.appendChild(option);
      });

      // Input Nombre
      const inputNombre = document.createElement('input');
      inputNombre.type = 'text';
      inputNombre.name = 'nombre_mascota[]';
      inputNombre.placeholder = 'Nombre de la mascota';
      inputNombre.required = true;
      inputNombre.maxLength = 50;

      // Botón Eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.type = 'button';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.classList.add('btn-eliminar');
      btnEliminar.addEventListener('click', () => div.remove());

      // Ensamblar nodo
      div.appendChild(selectTipo);
      div.appendChild(inputNombre);
      div.appendChild(btnEliminar);

      contenedor.appendChild(div);
    }

    // Agregar una fila inicial por defecto al cargar
    crearMascota();

    // Event listener para añadir nuevas mascotas
    btnAgregar.addEventListener('click', crearMascota);
  </script>
</body>
</html>