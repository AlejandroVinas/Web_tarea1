# Portal de Productos con Autenticación JWT y Chat en Tiempo Real

**Práctica 1 - Desarrollo Web**  
**Fecha de entrega:** 9 de noviembre de 2024  
**Repositorio:** [(https://github.com/AlejandroVinas/Web_tarea1)]

---

## 📋 Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Cómo Ejecutar la Aplicación](#cómo-ejecutar-la-aplicación)
7. [Cómo Probar la Aplicación](#cómo-probar-la-aplicación)
8. [Funcionalidades Implementadas](#funcionalidades-implementadas)
9. [Decisiones de Desarrollo](#decisiones-de-desarrollo)
10. [API Endpoints](#api-endpoints)
11. [Seguridad](#seguridad)
12. [Posibles Problemas y Soluciones](#posibles-problemas-y-soluciones)

---

## 📝 Descripción del Proyecto

Aplicación web full-stack que integra un sistema completo de gestión de productos con autenticación basada en JWT, control de roles (usuario/administrador) y chat en tiempo real mediante WebSockets. El proyecto cumple con todos los requisitos funcionales especificados en la práctica:

- ✅ Sistema de autenticación con JWT
- ✅ Gestión de roles (user/admin)
- ✅ CRUD completo de productos
- ✅ Chat en tiempo real con Socket.IO
- ✅ Persistencia de datos en MongoDB
- ✅ Protección de rutas privadas

---

## 🛠️ Tecnologías Utilizadas

| Capa | Tecnología | Versión |
|------|------------|---------|
| **Backend** | Node.js + Express | 4.18.2 |
| **Base de datos** | MongoDB + Mongoose | 8.0.0 |
| **Autenticación** | JSON Web Tokens (JWT) | 9.0.2 |
| **Encriptación** | Bcrypt | 5.1.1 |
| **Tiempo Real** | Socket.IO | 4.6.0 |
| **Frontend** | Vanilla JavaScript | ES6+ |
| **Gestión de Variables** | dotenv | 16.3.1 |
| **CORS** | cors | 2.8.5 |

---

## 📦 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **MongoDB** (local o acceso a MongoDB Atlas)
- **npm** (incluido con Node.js)
- Un navegador web moderno (Chrome, Firefox, Edge, Safari)

### Verificar instalación de Node.js y npm:

```bash
node --version
npm --version
```

### Verificar MongoDB (si es local):

```bash
mongod --version
```

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd Web/src
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias listadas en `package.json`:
- express
- mongoose
- bcrypt
- jsonwebtoken
- socket.io
- cors
- dotenv
- nodemon (dev)

### 3. Configurar variables de entorno

Crear un archivo `.env` en la carpeta `Web/src/` con el siguiente contenido:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/portalProductos
JWT_SECRET=claveSuperSecreta_cambiarEnProduccion
```

**Nota:** Si usas MongoDB Atlas, reemplaza `MONGO_URI` con tu connection string:

```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/portalProductos
```

### 4. Iniciar MongoDB (si es local)

**En Linux/Mac:**
```bash
sudo systemctl start mongod
# O
sudo service mongod start
```

**En Windows:**
```bash
net start MongoDB
```

**En macOS (con Homebrew):**
```bash
brew services start mongodb-community
```

---

## 📁 Estructura del Proyecto

```
Web/src/
├── config.js                    # Configuración (puerto, DB, JWT)
├── server.js                    # Servidor principal (Express + Socket.IO)
├── package.json                 # Dependencias del proyecto
├── .env                         # Variables de entorno (NO subir a Git)
│
├── models/
│   ├── User.js                 # Modelo de usuario con bcrypt
│   └── Product.js              # Modelo de producto
│
├── middleware/
│   ├── authenticateJWT.js      # Verificación de tokens JWT
│   └── isAdmin.js              # Verificación de rol administrador
│
├── routes/
│   ├── authRoutes.js           # Rutas de autenticación (login/registro)
│   ├── productRoutes.js        # Rutas CRUD de productos
│   └── chatRoutes.js           # Ruta para servir el chat
│
└── public/
    ├── index.html              # Página principal (login/productos)
    ├── chat.html               # Página del chat
    ├── client.js               # Lógica del cliente (frontend)
    └── styles.css              # Estilos CSS
```

---

## ▶️ Cómo Ejecutar la Aplicación

### Modo Producción:

```bash
cd Web/src
npm start
```

### Modo Desarrollo (con auto-reload):

```bash
npm run dev
```

### Acceder a la aplicación:

Abrir el navegador y navegar a:
```
http://localhost:3000
```

Deberías ver la pantalla de registro/login.

---

## 🧪 Cómo Probar la Aplicación

### Paso 1: Registrar Usuarios

#### Registrar un Usuario Normal:
1. En la sección "Registro", completar:
   - **Usuario:** `user1`
   - **Contraseña:** `pass123`
   - **Rol:** `Usuario`
2. Hacer clic en "Registrar"
3. Debería aparecer el mensaje: "Usuario registrado. Haz login."

#### Registrar un Administrador:
1. Completar:
   - **Usuario:** `admin1`
   - **Contraseña:** `admin123`
   - **Rol:** `Administrador`
2. Hacer clic en "Registrar"

### Paso 2: Probar Funcionalidades de Usuario Normal

1. **Iniciar sesión como user1:**
   - Usuario: `user1`
   - Contraseña: `pass123`
   - Clic en "Entrar"

2. **Verificar interfaz limitada:**
   - Debería aparecer: "Bienvenido user1 (user)"
   - Hacer clic en "Ver productos"
   - **IMPORTANTE:** NO deben aparecer botones de "Editar" ni "Eliminar"

3. **Probar el chat:**
   - Hacer clic en "Ir al chat"
   - Escribir mensajes
   - Abrir otra ventana/pestaña, hacer login con otro usuario
   - Verificar que los mensajes se sincronizan en tiempo real

### Paso 3: Probar Funcionalidades de Administrador

1. **Cerrar sesión y login como admin1:**
   - Hacer clic en "Cerrar sesión"
   - Login con admin1/admin123

2. **Crear producto:**
   - Clic en "Ver productos"
   - En la sección "Crear producto":
     - **Nombre:** `Laptop Gaming`
     - **Precio:** `1499.99`
     - **Descripción:** `Laptop de alto rendimiento`
   - Clic en "Crear"
   - El producto debe aparecer en la lista

3. **Editar producto:**
   - Hacer clic en el botón "Editar" junto a un producto
   - Aparecerán prompts para modificar:
     - Nuevo nombre
     - Nuevo precio
     - Nueva descripción
   - Confirmar cambios
   - Verificar que se actualizó en la lista

4. **Eliminar producto:**
   - Hacer clic en "Eliminar"
   - Confirmar la eliminación
   - El producto debe desaparecer de la lista

5. **Probar chat como administrador:**
   - Los administradores también pueden usar el chat
   - Verificar que aparece el nombre correcto en los mensajes

### Paso 4: Verificar Seguridad

1. **Probar acceso sin autenticación:**
   - Cerrar sesión
   - Intentar acceder directamente a `/chat.html`
   - Debe redirigir al inicio o mostrar error

2. **Probar operaciones no permitidas:**
   - Login como usuario normal
   - Intentar crear producto (si se modifica el frontend)
   - Debe recibir error "Se requiere rol admin"

---

## 🎯 Funcionalidades Implementadas

### 1. Autenticación y Autorización (35%)

#### ✅ Registro de Usuarios
- Formulario con campos: username, password, role
- Validación de campos obligatorios
- Verificación de usuario existente
- Hash de contraseña con bcrypt (10 rounds)
- Almacenamiento en MongoDB

#### ✅ Login de Usuarios
- Validación de credenciales
- Comparación de contraseña hasheada
- Generación de JWT con payload: `{id, username, role}`
- Token válido por 8 horas
- Almacenamiento del token en `localStorage`

#### ✅ Protección de Rutas
- Middleware `authenticateJWT` para rutas REST
- Verificación de token en header `Authorization: Bearer <token>`
- Middleware `isAdmin` para operaciones administrativas
- Protección de Socket.IO con JWT en handshake

#### ✅ Control de Roles
- **Usuario (user):** 
  - Ver productos
  - Acceder al chat
- **Administrador (admin):**
  - Ver productos
  - Crear productos
  - Editar productos
  - Eliminar productos
  - Acceder al chat

### 2. Gestión de Productos (25%)

#### ✅ Listar Productos (GET /api/products)
- Ordenados por fecha de creación (más recientes primero)
- Solo usuarios autenticados
- Muestra: nombre, precio, descripción

#### ✅ Ver Detalle (GET /api/products/:id)
- Obtener información completa de un producto
- Manejo de producto no encontrado (404)

#### ✅ Crear Producto (POST /api/products)
- Solo administradores
- Validación de campos requeridos (nombre, precio)
- Descripción opcional
- Confirmación visual en frontend

#### ✅ Editar Producto (PUT /api/products/:id)
- Solo administradores
- Interfaz con prompts para modificar campos
- Actualización en tiempo real en la lista

#### ✅ Eliminar Producto (DELETE /api/products/:id)
- Solo administradores
- Confirmación antes de eliminar
- Actualización inmediata de la lista

### 3. Chat en Tiempo Real (20%)

#### ✅ Conexión Autenticada
- Socket.IO con token JWT en `auth`
- Middleware de verificación antes de conectar
- Rechazo de conexiones no autenticadas

#### ✅ Envío de Mensajes
- Input de texto con validación
- Emisión del mensaje al servidor
- Broadcast a todos los clientes conectados

#### ✅ Recepción de Mensajes
- Formato: `[HH:MM:SS] username: mensaje`
- Auto-scroll al último mensaje
- Sincronización en tiempo real

#### ✅ Manejo de Usuarios
- Muestra nombre del usuario conectado
- Log en servidor de conexiones/desconexiones
- Botón para volver a la página principal

### 4. Persistencia (Integrado)

#### ✅ MongoDB con Mongoose
- Conexión con manejo de errores
- Modelos con esquemas definidos
- Validaciones a nivel de base de datos
- Timestamps automáticos (createdAt, updatedAt)

---

## 🧠 Decisiones de Desarrollo

### 1. Arquitectura Backend: Express con Socket.IO

**Decisión:** Usar un único servidor HTTP que maneja tanto Express como Socket.IO.

**Justificación:**
- Simplifica el despliegue (un solo puerto)
- Permite compartir middlewares de autenticación
- Reduce la complejidad de configuración
- Mejor rendimiento al evitar proxies adicionales

**Implementación:**
```javascript
const server = http.createServer(app);
const io = new IOServer(server);
server.listen(config.port);
```

### 2. Autenticación: JWT vs Sesiones

**Decisión:** JSON Web Tokens (JWT) en lugar de sesiones tradicionales.

**Justificación:**
- **Stateless:** No requiere almacenamiento en servidor
- **Escalabilidad:** Fácil de escalar horizontalmente
- **Compatibilidad:** Funciona perfectamente con APIs REST
- **Flexibilidad:** El payload incluye información del usuario (id, username, role)
- **Seguridad:** Tokens firmados y con expiración

**Consideraciones:**
- Token almacenado en `localStorage` (vulnerable a XSS)
- **Mejora futura:** Usar `httpOnly cookies` para mayor seguridad
- Expiración de 8 horas (balance entre seguridad y UX)

**Alternativa rechazada:** Sessions con express-session
- Requiere almacenamiento (Redis/MongoDB)
- Mayor complejidad para Socket.IO
- Menos apropiado para arquitecturas distribuidas

### 3. Hash de Contraseñas: Bcrypt

**Decisión:** Usar bcrypt con 10 rounds de salt.

**Justificación:**
- Estándar de la industria para hash de contraseñas
- Resistente a ataques de fuerza bruta
- Salt automático (único por usuario)
- Función `compare` de tiempo constante (previene timing attacks)

**Implementación:**
- Pre-hook en modelo Mongoose para hash automático
- Método `comparePassword` en el modelo User

```javascript
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

### 4. Frontend: Vanilla JavaScript vs Frameworks

**Decisión:** Usar Vanilla JavaScript sin frameworks (React, Vue, Angular).

**Justificación:**
- **Simplicidad:** Cumple con los requisitos sin complejidad adicional
- **Rendimiento:** Sin overhead de frameworks
- **Aprendizaje:** Demuestra comprensión de JavaScript puro
- **Dependencias:** Menos librerías que instalar y mantener

**Consideraciones:**
- Para un proyecto real de mayor escala: React o Vue serían más apropiados
- Manejo manual del DOM (más verboso pero educativo)
- Sin sistema de componentes reutilizables

**Mejora futura:** Migrar a React para:
- Componentes reutilizables
- Estado global (Context API/Redux)
- Mejor manejo de formularios
- Typescript para type safety

### 5. Edición de Productos: Prompts vs Modal

**Decisión:** Usar `prompt()` nativo del navegador para editar productos.

**Justificación:**
- **MVP (Minimum Viable Product):** Cumple el requisito funcional
- **Rapidez de implementación:** No requiere crear componentes modales
- **Sin dependencias:** No necesita librerías de UI

**Desventajas reconocidas:**
- UX no óptima (bloquea la UI)
- No cumple con principios modernos de diseño
- Difícil de estilizar

**Mejora futura:** Implementar modal personalizado:
```javascript
// Modal con formulario en HTML
<div id="editModal" class="modal">
  <form id="editForm">
    <input id="editName" />
    <input id="editPrice" />
    <textarea id="editDesc"></textarea>
  </form>
</div>
```

### 6. Roles en el Token vs Base de Datos

**Decisión:** Incluir el rol en el payload del JWT.

**Justificación:**
- **Performance:** Evita consultas a BD en cada request
- **Simplicidad:** Verificación inmediata con el token
- **Stateless:** Mantiene la filosofía JWT

**Consideraciones de seguridad:**
- Si se cambia el rol, el token antiguo sigue siendo válido hasta expirar
- **Solución:** Implementar lista negra de tokens o reducir tiempo de expiración
- Para aplicaciones críticas: verificar rol en BD en operaciones sensibles

**Implementación:**
```javascript
const payload = { id, username, role };
const token = jwt.sign(payload, secret, { expiresIn: "8h" });
```

### 7. Socket.IO: Autenticación en Handshake

**Decisión:** Verificar JWT antes de establecer la conexión WebSocket.

**Justificación:**
- **Seguridad:** Previene conexiones no autorizadas
- **Performance:** Rechaza conexiones inválidas tempranamente
- **Claridad:** Usuario no autenticado nunca accede al chat

**Implementación:**
```javascript
io.use(async (socket, next) => {
  try {
    await verifySocketJWT(socket);
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});
```

**Alternativa rechazada:** Verificar en cada mensaje
- Más ineficiente (verifica en cada evento)
- Permite conexiones no autorizadas

### 8. Estructura de Carpetas: Modular por Funcionalidad

**Decisión:** Separar en carpetas models/, routes/, middleware/, public/.

**Justificación:**
- **Escalabilidad:** Fácil de encontrar y modificar archivos
- **Separación de responsabilidades:** Cada carpeta tiene un propósito claro
- **Buenas prácticas:** Patrón estándar en aplicaciones Express
- **Mantenibilidad:** Facilita el trabajo en equipo

**Estructura elegida:**
```
src/
├── config.js          # Configuración centralizada
├── server.js          # Punto de entrada
├── models/            # Esquemas de datos
├── routes/            # Endpoints REST
├── middleware/        # Lógica de autenticación/autorización
└── public/            # Archivos estáticos del cliente
```

### 9. Gestión de Errores: Try-Catch vs Middleware Global

**Decisión:** Try-catch en cada ruta con respuestas JSON consistentes.

**Justificación:**
- **Control granular:** Manejo específico por ruta
- **Mensajes claros:** Errores descriptivos para el cliente
- **Debugging:** Console.error para logs de servidor

**Implementación:**
```javascript
try {
  // Lógica de la ruta
  res.json({ data });
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Error en servidor" });
}
```

**Mejora futura:** Middleware global de errores:
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});
```

### 10. Base de Datos: MongoDB vs SQL

**Decisión:** MongoDB con Mongoose.

**Justificación:**
- **Requisito del proyecto:** Especificado en la práctica
- **Flexibilidad:** Esquema flexible para iteraciones rápidas
- **JSON nativo:** Integración natural con Node.js y JavaScript
- **Mongoose:** ODM que facilita validaciones y relaciones

**Ventajas en este proyecto:**
- No hay relaciones complejas
- Modelos simples (User, Product)
- Rápida configuración y desarrollo

**Alternativa:** PostgreSQL/MySQL
- Mejor para datos relacionales complejos
- Transacciones ACID más robustas
- Menos flexible en cambios de esquema

### 11. Variables de Entorno: dotenv

**Decisión:** Usar dotenv para gestionar configuración sensible.

**Justificación:**
- **Seguridad:** Evita hardcodear credenciales en el código
- **Flexibilidad:** Diferentes configs para dev/prod
- **Estándar:** Práctica común en Node.js

**Configuración:**
```javascript
// config.js
export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost...",
  jwtSecret: process.env.JWT_SECRET || "fallback"
};
```

### 12. CORS: Permisivo vs Restrictivo

**Decisión:** CORS permisivo (`origin: "*"`).

**Justificación:**
- **Desarrollo:** Facilita pruebas desde cualquier origen
- **Simplicidad:** Sin configuración compleja

**En producción debería ser:**
```javascript
app.use(cors({
  origin: "https://tudominio.com",
  credentials: true
}));
```

---

## 🔌 API Endpoints

### Autenticación

#### POST `/api/auth/register`
Registrar un nuevo usuario.

**Body:**
```json
{
  "username": "user1",
  "password": "pass123",
  "role": "user"  // "user" o "admin"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario creado",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "user1",
    "role": "user"
  }
}
```

**Errores:**
- `400`: "Faltan datos" o "Usuario ya existe"
- `500`: "Error en servidor"

---

#### POST `/api/auth/login`
Iniciar sesión y obtener JWT.

**Body:**
```json
{
  "username": "user1",
  "password": "pass123"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "user1",
    "role": "user"
  }
}
```

**Errores:**
- `400`: "Faltan datos" o "Usuario/contraseña inválidos"
- `500`: "Error en servidor"

---

### Productos (Requieren Autenticación)

**Nota:** Todas las rutas requieren header:
```
Authorization: Bearer <token>
```

#### GET `/api/products`
Obtener listado de todos los productos.

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop Gaming",
    "description": "Laptop de alto rendimiento",
    "price": 1499.99,
    "createdAt": "2024-11-08T10:00:00.000Z",
    "updatedAt": "2024-11-08T10:00:00.000Z"
  }
]
```

**Errores:**
- `401`: "Token requerido"
- `403`: "Token inválido"
- `500`: "Error"

---

#### GET `/api/products/:id`
Obtener detalle de un producto específico.

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop Gaming",
  "description": "Laptop de alto rendimiento",
  "price": 1499.99,
  "createdAt": "2024-11-08T10:00:00.000Z",
  "updatedAt": "2024-11-08T10:00:00.000Z"
}
```

**Errores:**
- `404`: "No encontrado"
- `500`: "Error"

---

#### POST `/api/products` (Solo Admin)
Crear un nuevo producto.

**Body:**
```json
{
  "name": "Laptop Gaming",
  "description": "Laptop de alto rendimiento",
  "price": 1499.99
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop Gaming",
  "description": "Laptop de alto rendimiento",
  "price": 1499.99,
  "createdAt": "2024-11-08T10:00:00.000Z",
  "updatedAt": "2024-11-08T10:00:00.000Z"
}
```

**Errores:**
- `400`: "Faltan campos"
- `403`: "Se requiere rol admin"
- `500`: "Error"

---

#### PUT `/api/products/:id` (Solo Admin)
Actualizar un producto existente.

**Body:**
```json
{
  "name": "Laptop Gaming Pro",
  "description": "Versión mejorada",
  "price": 1699.99
}
```

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop Gaming Pro",
  "description": "Versión mejorada",
  "price": 1699.99,
  "createdAt": "2024-11-08T10:00:00.000Z",
  "updatedAt": "2024-11-08T11:30:00.000Z"
}
```

**Errores:**
- `403`: "Se requiere rol admin"
- `404`: "No encontrado"
- `500`: "Error"

---

#### DELETE `/api/products/:id` (Solo Admin)
Eliminar un producto.

**Respuesta exitosa (200):**
```json
{
  "message": "Eliminado"
}
```

**Errores:**
- `403`: "Se requiere rol admin"
- `404`: "No encontrado"
- `500`: "Error"

---

### Chat

#### GET `/chat`
Servir la página HTML del chat (protegida).

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta:** HTML de chat.html

---

### Socket.IO Events

#### Conexión
```javascript
const socket = io({ auth: { token: "tu_token_jwt" } });
```

#### Eventos del Cliente

**`message`** - Enviar mensaje
```javascript
socket.emit("message", "Hola a todos");
```

#### Eventos del Servidor

**`message`** - Recibir mensaje
```javascript
socket.on("message", (msg) => {
  // msg = { user: "username", text: "...", time: Date }
});
```

**`connect_error`** - Error de autenticación
```javascript
socket.on("connect_error", (err) => {
  console.error(err.message); // "Authentication error"
});
```

---

## 🔒 Seguridad

### Medidas Implementadas

1. **Contraseñas Hasheadas**
   - Bcrypt con 10 rounds de salt
   - Hash automático antes de guardar
   - Comparación de tiempo constante

2. **JWT con Expiración**
   - Tokens válidos por 8 horas
   - Payload firmado con secret
   - Verificación en cada request

3. **Validación de Roles**
   - Middleware `isAdmin` para operaciones administrativas
   - Verificación tanto en REST como Socket.IO

4. **Protección de Rutas**
   - Todas las rutas privadas requieren JWT válido
   - Socket.IO rechaza conexiones sin token

5. **Variables de Entorno**
   - Credenciales y secrets en `.env`
   - `.env` excluido de Git (`.gitignore`)

6. **Validación de Entrada**
   - Comprobación de campos requeridos
   - Mongoose valida tipos de datos
   - Sanitización implícita por Mongoose

### Vulnerabilidades Conocidas y Mitigaciones Futuras

#### 1. XSS (Cross-Site Scripting)
**Riesgo:** Token en localStorage es vulnerable a scripts maliciosos.

**Mitigación futura:**
- Usar `httpOnly cookies` para almacenar JWT
- Implementar Content Security Policy (CSP)
- Sanitizar inputs del chat

#### 2. CSRF (Cross-Site Request Forgery)
**Riesgo:** Si se usan cookies, podrían ser enviadas automáticamente.

**Mitigación futura:**
- CSRF tokens en formularios
- SameSite cookies

#### 3. Rate Limiting
**Riesgo:** Ataques de fuerza bruta en login.

**Mitigación futura:**
```javascript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5 // 5 intentos
});

app.use("/api/auth/login", limiter);
```

#### 4. HTTPS
**Riesgo:** Tráfico no cifrado en desarrollo.

**Mitigación en producción:**
- Usar HTTPS (Let's Encrypt)
- Redirigir HTTP a HTTPS
- HSTS headers

---

## ⚠️ Posibles Problemas y Soluciones

### 1. MongoDB no conecta

**Síntoma:**
```
Error MongoDB: MongoNetworkError
```

**Soluciones:**

a) **MongoDB no está corriendo:**
```bash
# Linux/Mac
sudo systemctl start mongod

# Windows
net start MongoDB
```

b) **URI incorrecta en .env:**
- Verificar que `MONGO_URI` en `.env` sea correcta
- Si usas Atlas, verificar whitelist de IPs

c) **Firewall bloqueando puerto 27017:**
```bash
sudo ufw allow 27017
```

---

### 2. "Token inválido" después de un tiempo

**Síntoma:**
El usuario es deslogueado automáticamente.

**Causa:**
Token expiró (8 horas).

**Solución:**
- Hacer login nuevamente
- O aumentar expiración en `authRoutes.js`:
```javascript
const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "24h" });
```

---

### 3. Chat no conecta / "Authentication error"

**Síntoma:**
Alert: "Error conexión al chat: Authentication error"

**Causas y soluciones:**

a) **Token no está en localStorage:**
```javascript
// Verificar en la consola del navegador:
localStorage.getItem("token")
```
**Solución:** Hacer login primero.

b) **Token expirado:**
**Solución:** Logout y login nuevamente.

c) **Socket.IO no carga:**
**Solución:** Verificar que el servidor esté corriendo en el puerto correcto.

---

### 4. "Cannot GET /api/products" - 404

**Síntoma:**
Error 404 al intentar acceder a productos.

**Causa:**
Ruta no registrada o servidor no iniciado correctamente.

**Solución:**
```bash
# Reiniciar servidor
npm start

# Verificar logs en la consola
# Debe aparecer: "Servidor en http://localhost:3000"
```

---

### 5. Botones Editar/Eliminar no aparecen

**Síntoma:**
Usuario admin no ve botones de administración.

**Causa:**
El rol en localStorage no es "admin".

**Solución:**
```javascript
// Verificar en la consola del navegador:
JSON.parse(localStorage.getItem("user"))

// Debe mostrar: { id: "...", username: "admin1", role: "admin" }
```

Si el rol es "user", volver a registrarse seleccionando "Administrador".

---

### 6. npm install falla

**Síntoma:**
```
npm ERR! code ENOENT
```

**Solución:**

a) **package.json no encontrado:**
```bash
# Asegurarse de estar en Web/src/
cd Web/src
npm install
```

b) **Permisos:**
```bash
sudo npm install
```

c) **Cache corrupta:**
```bash
npm cache clean --force
npm install
```

---

### 7. bcrypt no compila

**Síntoma:**
```
Error: Module did not self-register
```

**Solución:**
```bash
npm rebuild bcrypt --build-from-source
```

---

### 8. Puerto 3000 ya en uso

**Síntoma:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solución:**

a) **Cambiar puerto en .env:**
```env
PORT=3001
```

b) **Matar proceso en el puerto:**
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### 9. CORS Error en desarrollo

**Síntoma:**
```
Access to fetch has been blocked by CORS policy
```

**Causa:**
Frontend y backend en diferentes puertos/dominios.

**Solución:**
El proyecto ya tiene CORS configurado en `server.js`:
```javascript
app.use(cors());
```

Si persiste:
```javascript
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
```

---

### 10. Mongoose DeprecationWarning

**Síntoma:**
```
DeprecationWarning: collection.ensureIndex is deprecated
```

**Causa:**
Versión antigua de Mongoose con opciones deprecadas.

**Solución:**
El proyecto ya usa la sintaxis moderna:
```javascript
mongoose.connect(config.mongoURI)
```

No usar `useNewUrlParser` ni `useUnifiedTopology`.

---

## 📊 Pruebas de Rendimiento

### Carga del Chat

**Escenario:** 10 usuarios simultáneos enviando mensajes.

**Resultado esperado:**
- Latencia < 100ms
- Sin pérdida de mensajes
- Sincronización correcta

**Cómo probar:**
1. Abrir 10 pestañas/navegadores
2. Login en cada una con diferentes usuarios
3. Ir al chat en todas
4. Enviar mensajes desde varias a la vez
5. Verificar que todos reciben todos los mensajes

---

### Carga de Productos

**Escenario:** 100+ productos en la base de datos.

**Cómo probar:**
1. Usar script para insertar muchos productos:

```javascript
// insertProducts.js
import mongoose from "mongoose";
import Product from "./models/Product.js";

mongoose.connect("mongodb://localhost:27017/portalProductos");

async function insertMany() {
  const products = [];
  for (let i = 1; i <= 100; i++) {
    products.push({
      name: `Producto ${i}`,
      description: `Descripción del producto ${i}`,
      price: Math.random() * 1000
    });
  }
  await Product.insertMany(products);
  console.log("100 productos insertados");
  process.exit();
}

insertMany();
```

2. Ejecutar: `node insertProducts.js`
3. Recargar página de productos
4. Verificar que carga rápidamente

---

## 🚀 Mejoras Futuras Recomendadas

### 1. Funcionalidades Adicionales

#### a) Historial Persistente del Chat
Actualmente los mensajes solo existen en memoria.

**Implementación:**
```javascript
// models/Message.js
const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  timestamp: { type: Date, default: Date.now }
});

// server.js
io.on("connection", async (socket) => {
  // Enviar historial al conectar
  const history = await Message.find().limit(50).sort({ timestamp: -1 });
  socket.emit("history", history);
  
  socket.on("message", async (text) => {
    const msg = new Message({ user: socket.user.id, text });
    await msg.save();
    io.emit("message", msg);
  });
});
```

#### b) Subida de Imágenes de Productos
Usar Multer para uploads.

**Dependencias:**
```bash
npm install multer cloudinary
```

**Implementación:**
```javascript
import multer from "multer";
const upload = multer({ dest: "uploads/" });

router.post("/", authenticateJWT, isAdmin, upload.single("image"), async (req, res) => {
  const { name, description, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const p = new Product({ name, description, price, image: imageUrl });
  await p.save();
  res.status(201).json(p);
});
```

#### c) Búsqueda y Filtrado de Productos
```javascript
router.get("/search", authenticateJWT, async (req, res) => {
  const { q, minPrice, maxPrice } = req.query;
  const query = {};
  
  if (q) query.name = new RegExp(q, "i");
  if (minPrice) query.price = { $gte: parseFloat(minPrice) };
  if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };
  
  const products = await Product.find(query);
  res.json(products);
});
```

#### d) Paginación de Productos
```javascript
router.get("/", authenticateJWT, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await Product.countDocuments();
  
  res.json({
    products,
    page,
    totalPages: Math.ceil(total / limit),
    total
  });
});
```

#### e) Notificaciones en Tiempo Real
Notificar cuando se crea/edita/elimina un producto.

```javascript
// server.js
io.on("connection", (socket) => {
  socket.on("productCreated", (product) => {
    socket.broadcast.emit("newProduct", product);
  });
});

// client.js (después de crear producto)
socket.emit("productCreated", data);
```

---

### 2. Mejoras de UI/UX

#### a) Framework CSS
Integrar Bootstrap o Tailwind:

```html
<!-- En index.html y chat.html -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

#### b) Modal para Edición
Reemplazar `prompt()` con modal HTML/CSS.

#### c) Indicador de "Usuario escribiendo..."
```javascript
// Chat
socket.on("typing", (username) => {
  document.getElementById("typing").innerText = `${username} está escribiendo...`;
});

msgInput.oninput = () => {
  socket.emit("typing", user.username);
};
```

#### d) Avatares de Usuario
Usar [Gravatar](https://gravatar.com) o [UI Avatars](https://ui-avatars.com):

```javascript
const avatarUrl = `https://ui-avatars.com/api/?name=${username}&background=random`;
```

---

### 3. Mejoras de Seguridad

#### a) Refresh Tokens
```javascript
// Generar dos tokens
const accessToken = jwt.sign(payload, secret, { expiresIn: "15m" });
const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "7d" });

// Almacenar refresh token en BD
await RefreshToken.create({ userId, token: refreshToken });

// Endpoint para refrescar
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  // Verificar y generar nuevo accessToken
});
```

#### b) Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Demasiados intentos de login"
});

app.use("/api/auth/login", loginLimiter);
```

#### c) Helmet para Headers de Seguridad
```bash
npm install helmet
```

```javascript
import helmet from "helmet";
app.use(helmet());
```

#### d) Validación con Joi o Zod
```bash
npm install joi
```

```javascript
import Joi from "joi";

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").default("user")
});

router.post("/register", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  // Continuar...
});
```

---

### 4. Testing

#### a) Tests Unitarios con Jest
```bash
npm install --save-dev jest supertest
```

```javascript
// tests/auth.test.js
import request from "supertest";
import app from "../server.js";

describe("Auth", () => {
  test("POST /api/auth/register - Success", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "test", password: "test123", role: "user" });
    
    expect(res.status).toBe(201);
    expect(res.body.user.username).toBe("test");
  });
});
```

#### b) Tests de Integración
Probar flujos completos: registro → login → crear producto.

#### c) Tests de Socket.IO
```javascript
import io from "socket.io-client";

test("Chat - Send message", (done) => {
  const socket = io("http://localhost:3000", {
    auth: { token: "valid_token" }
  });
  
  socket.on("message", (msg) => {
    expect(msg.text).toBe("Hola");
    socket.disconnect();
    done();
  });
  
  socket.emit("message", "Hola");
});
```

---

### 5. DevOps y Despliegue

#### a) Dockerización
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/portalProductos
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongo
  
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

#### b) CI/CD con GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - name: Deploy to Render
        run: |
          # Script de deploy
```

#### c) Despliegue en Render.com
1. Crear cuenta en [Render](https://render.com)
2. Conectar repositorio GitHub
3. Configurar variables de entorno:
   - `MONGO_URI`: Connection string de MongoDB Atlas
   - `JWT_SECRET`: Secret seguro
4. Deploy automático en cada push

#### d) Monitoreo con PM2
```bash
npm install -g pm2

# Iniciar
pm2 start server.js --name "portal-productos"

# Monitorear
pm2 monit

# Logs
pm2 logs

# Restart automático en crashes
pm2 startup
```

---

## 📚 Recursos y Referencias

### Documentación Oficial
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Mongoose](https://mongoosejs.com/docs/)
- [Socket.IO](https://socket.io/docs/)
- [JWT](https://jwt.io/introduction)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

### Tutoriales Utilizados
- JWT Authentication: [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
- Socket.IO with Express: [Official Guide](https://socket.io/get-started/chat)
- Mongoose Best Practices: [MongoDB University](https://university.mongodb.com/)


## 🎓 Conclusiones

Este proyecto ha permitido:

1. **Integrar múltiples tecnologías** modernas de desarrollo web
2. **Implementar autenticación segura** con JWT y bcrypt
3. **Trabajar con WebSockets** para comunicación en tiempo real
4. **Diseñar una API RESTful** siguiendo buenas prácticas
5. **Gestionar roles y permisos** en una aplicación web
6. **Conectar frontend y backend** de forma eficiente
7. **Comprender la arquitectura** de aplicaciones full-stack

### Aprendizajes Clave

- **Seguridad:** Importancia de hash de contraseñas y tokens firmados
- **Arquitectura:** Separación de responsabilidades (MVC)
- **Asincronía:** Manejo de promesas y async/await
- **Estado:** Gestión de sesión con JWT
- **Real-time:** Comunicación bidireccional con Socket.IO

### Próximos Pasos

1. Implementar las mejoras futuras listadas
2. Añadir tests automatizados
3. Desplegar en producción
4. Recopilar feedback de usuarios
5. Iterar sobre el producto

---

**Enlace a Github del Proyecto** 


**Última actualización:** 8 de noviembre de 2024  
**Versión:** 1.0.0  
**Estado:** ✅ Funcional y listo para entrega
