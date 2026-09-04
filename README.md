# 🐾 Guau&Miau - Sistema de Registro, Login y Gestión de Mascotas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

Este proyecto corresponde a la **Evaluación Formativa 1** de la Escuela de Informática y Telecomunicaciones (**Duoc UC**). Consiste en una aplicación web moderna para la tienda en línea especializada **Guau&Miau**, que resuelve los problemas de usabilidad en sus procesos de registro, autenticación y persistencia de clientes con sus respectivas mascotas.

---

## 📋 Tabla de Contenidos
1. [Características del Sistema](#-características-del-sistema)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Distribución de Roles y Módulos](#-distribución-de-roles-y-módulos)
4. [Estrategia de Ramas en Git (GitHub Flow)](#-estrategia-de-ramas-en-git-github-flow)
5. [Instrucciones de Uso y Pruebas](#-instrucciones-de-uso-y-pruebas)
6. [Validaciones Implementadas](#-validaciones-implementadas)

---

## ✨ Características del Sistema

- 📝 **Registro de Usuario Avanzado:** Formulario intuitivo con validaciones estrictas en tiempo real y retroalimentación mediante mensajes de error claros.
- 🐶 **Gestión Dinámica de Mascotas:** Permitir al usuario registrar múltiples mascotas con nombre y tipo (*Perro, Gato, Ave, Otro*) y eliminar entradas fácilmente.
- 💾 **Persistencia en LocalStorage:** Almacenamiento centralizado de cuentas de usuario y sus mascotas asociadas en una base de datos local JSON.
- 🔑 **Autenticación e Inicio de Sesión:** Validación de credenciales registradas con detección explícita de *"Correo no registrado"* o *"Contraseña incorrecta"*.
- 📩 **Modal de Recuperación de Acceso:** Interfaz modal interactiva para la recuperación simulada de contraseña.
- 🎨 **Identidad Visual y Estilos Adaptativos:** Paleta de colores cálida y amigable para la tienda de mascotas, totalmente responsive.

---

## 📁 Diagrama de Estructura de Carpetas

```plaintext
guau-miau/
│
├── index.html                  # 🔐 Vista de Inicio de Sesión (Login) y Modal de Recuperación
├── registro.html               # 📝 Vista de Registro de Usuario y Gestión de Mascotas
├── README.md                   # 📄 Documentación general del proyecto
│
├── 📁 css/
│   ├── styles.css              # 🎨 Estilos globales, variables CSS y diseño base de la marca
│   ├── login.css               # 🔑 Estilos específicos del Login y Modal de Recuperación
│   └── registro.css            # 🐶 Estilos del Formulario de Registro y Tarjetas de Mascotas
│
└── 📁 js/
    ├── storage.js              # 💾 Persistencia de datos, unicidad de correo y auth (localStorage)
    ├── mascotas.js             # 🐾 Lógica dinámica para añadir y eliminar tarjetas de mascotas
    ├── registro.js             # 📋 Validaciones de campos de usuario y proceso de registro
    └── login.js                # 🔓 Lógica de inicio de sesión e interacción del modal
```


---

## 👥 Distribución de Roles y Módulos

El proyecto fue desarrollado de manera colaborativa dividiendo responsabilidades por módulos funcionales:

### 👤 Guillermo — Módulo de Registro de Usuario
- **Archivos:** `registro.html`, `js/registro.js`, `css/registro.css`
- **Responsabilidades:** Maquetación del formulario de registro y lógica de validación de campos de usuario (Nombre, Correo institucional `@duoc.cl`, Contraseña con requerimientos de seguridad, Confirmar Contraseña y Teléfono).

### 👤 Vicente — Módulo Dinámico de Mascotas y Persistencia
- **Archivos:** `js/mascotas.js`, `js/storage.js`
- **Responsabilidades:** Implementación del generador dinámico de tarjetas de mascotas en el DOM, función de captura de arreglos de mascotas y gestión de almacenamiento en `localStorage` (`guau_miau_usuarios`), incluyendo la validación de unicidad de correo.

### 👤 Daniel — Módulo de Login, Recuperación y Estilos Base
- **Archivos:** `index.html`, `js/login.js`, `css/styles.css`, `css/login.css`
- **Responsabilidades:** Identidad visual de la marca Guau&Miau, diseño responsivo, maquetación del sistema de autenticación, modal dinámico de recuperación de acceso y validación de inicio de sesión.

---

## 🌿 Estrategia de Ramas en Git (GitHub Flow)

Para evitar conflictos y asegurar entregas estables, se implementó el flujo **GitHub Flow**:

- `main`: Rama de producción. Contiene únicamente código estable y probado al 100%.
- `develop`: Rama de integración donde se consolidan las funcionalidades antes de pasar a `main`.
- `feature/*`: Ramas individuales de desarrollo por módulo:
  - `feature/registro-usuario` (Módulo de Registro)
  - `feature/mascotas-storage` (Módulo de Mascotas & Persistencia)
  - `feature/login-estilos` (Módulo de Login & Estilos Base)

---

## 🚀 Instrucciones de Uso y Pruebas

### 1. Clonar el repositorio
```bash
git clone https://github.com/guillermo-manriquez/formativa1.git
cd formativa1
```

### 2. Ejecutar la aplicación
No se requieren dependencias externas ni servidores Node.js. Simplemente abre `index.html` o `registro.html` en cualquier navegador web moderno.

En PowerShell de Windows:
```powershell
Start-Process registro.html
```

### 3. Secuencia de pruebas recomendada
1. Abrir `registro.html` y llenar el formulario.
2. Hacer clic en **`+ Añadir Mascota`** para registrar una o más mascotas (*Ej. Firulais - Perro*).
3. Hacer clic en **`Crear Cuenta`**.
4. Abrir la consola de desarrollo (**F12** $\rightarrow$ *Application* $\rightarrow$ *Local Storage*) para comprobar que los datos se guardaron bajo la clave `guau_miau_usuarios`.
5. Probar ingresar a `index.html` e iniciar sesión con el correo y contraseña registrados.

---

## ⚙️ Validaciones Implementadas

| Campo | Regla de Validación |
| :--- | :--- |
| **Nombre Completo** | Obligatorio, máximo 50 caracteres, solo letras y espacios. |
| **Correo Electrónico** | Obligatorio, formato válido de e-mail y dominio estricto `@duoc.cl`. Único en el sistema. |
| **Contraseña** | Obligatoria, mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (`@#$%!^&*`). |
| **Confirmar Contraseña** | Obligatoria, coincidencia exacta con la contraseña ingresada. |
| **Teléfono** | Opcional, formato numérico (8 a 15 dígitos) en caso de ingresarse. |
| **Mascota - Tipo** | Obligatorio en cada tarjeta agregada (*Perro, Gato, Ave, Otro*). |
| **Mascota - Nombre** | Obligatorio en cada tarjeta agregada, máximo 50 caracteres. |

---

## 🎓 Institución y Asignatura
- **Institución:** Duoc UC - Escuela de Informática y Telecomunicaciones
- **Proyecto:** Evaluación Formativa 1 - Caso Tienda Guau&Miau