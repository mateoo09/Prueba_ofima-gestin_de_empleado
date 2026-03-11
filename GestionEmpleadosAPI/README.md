# 🏢 Sistema de Gestión de Empleados - Backend

## 📋 Descripción

API REST desarrollada en **ASP.NET Core 8.0** para la gestión de empleados y autenticación de usuarios. Sistema backend completo con operaciones CRUD, autenticación y documentación Swagger.

---

## 🚀 Tecnologías Utilizadas

### Framework Principal
- **.NET 8.0** - Framework principal
- **ASP.NET Core Web API** - Creación de servicios REST
- **C# 12.0** - Lenguaje de programación

### Base de Datos
- **Entity Framework Core 8.0** - ORM para acceso a datos
- **SQL Server LocalDB** - Base de datos local
- **EF Core Migrations** - Gestión de esquema de base de datos

### Documentación
- **Swagger UI / Swashbuckle** - Documentación interactiva de la API

### Seguridad
- **CORS** - Configurado para permitir peticiones desde Angular (puerto 4200)

---

## 📁 Estructura del Proyecto

```
GestionEmpleadosAPI/
├── Controllers/
│   ├── AuthController.cs        # Autenticación (Login/Register)
│   ├── EmployeesController.cs   # CRUD de empleados
│   └── UsersController.cs       # CRUD de usuarios
├── Models/
│   ├── Employee.cs              # Modelo de Empleado
│   ├── User.cs                  # Modelo de Usuario
│   └── LoginRequest.cs          # DTO para login
├── Data/
│   └── AppDbContext.cs          # Contexto de Entity Framework
├── Migrations/                  # Migraciones de base de datos
├── Program.cs                   # Configuración principal
└── appsettings.json            # Configuración de la aplicación
```

---

## 🔧 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- ✅ [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- ✅ [SQL Server LocalDB](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb) (incluido con Visual Studio)
- ✅ [Visual Studio 2022](https://visualstudio.microsoft.com/) o [Visual Studio Code](https://code.visualstudio.com/)

---

## ⚙️ Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/mateoo09/Prueba_ofima-gestin_de_empleado.git
cd Prueba_ofima-gestin_de_empleado
```

### 2️⃣ Restaurar Dependencias

```bash
cd GestionEmpleadosAPI
dotnet restore
```

### 3️⃣ Configurar Base de Datos

La cadena de conexión está en `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=EmployeeDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

### 4️⃣ Aplicar Migraciones

```bash
dotnet ef database update
```

Esto creará:
- ✅ Base de datos `EmployeeDB`
- ✅ Tabla `Employees`
- ✅ Tabla `Users`

### 5️⃣ Ejecutar la Aplicación

#### Opción A: Visual Studio
1. Abrir `GestionEmpleadosAPI.sln`
2. Presionar **F5** o clic en ▶️
3. Se abrirá automáticamente Swagger en `http://localhost:5299/`

#### Opción B: Terminal
```bash
dotnet run
```

---

## 🌐 Endpoints de la API

### 🔐 Autenticación

#### Login
```http
POST /api/Auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

#### Registro de Usuario
```http
POST /api/Auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123"
}
```

---

### 👥 Empleados (Employees)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/Employees` | Obtener todos los empleados |
| `GET` | `/api/Employees/{id}` | Obtener empleado por ID |
| `POST` | `/api/Employees` | Crear nuevo empleado |
| `PUT` | `/api/Employees/{id}` | Actualizar empleado |
| `DELETE` | `/api/Employees/{id}` | Eliminar empleado |

#### Ejemplo: Crear Empleado
```http
POST /api/Employees
Content-Type: application/json

{
  "name": "Juan Pérez",
  "position": "Developer",
  "salary": 55000
}
```

---

### 👤 Usuarios (Users)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/Users` | Obtener todos los usuarios |
| `GET` | `/api/Users/{id}` | Obtener usuario por ID |
| `POST` | `/api/Users` | Crear nuevo usuario |
| `PUT` | `/api/Users/{id}` | Actualizar usuario |
| `DELETE` | `/api/Users/{id}` | Eliminar usuario |

---

## 📊 Modelos de Datos

### Employee
```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public decimal Salary { get; set; }
}
```

### User
```csharp
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}
```

---

## 🧪 Pruebas con Swagger

1. Ejecutar la aplicación
2. Navegar a: `http://localhost:5299/`
3. Explorar y probar todos los endpoints desde la interfaz Swagger

![Swagger UI](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

---

## 🔒 Configuración CORS

El backend está configurado para aceptar peticiones desde el frontend Angular:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

---

## 📦 Dependencias NuGet

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `Microsoft.EntityFrameworkCore` | 8.0.0 | ORM para base de datos |
| `Microsoft.EntityFrameworkCore.SqlServer` | 8.0.0 | Proveedor SQL Server |
| `Microsoft.EntityFrameworkCore.Tools` | 8.0.0 | Herramientas de migración |
| `Swashbuckle.AspNetCore` | 6.6.2 | Documentación Swagger |

---

## 🛠️ Comandos Útiles

### Crear nueva migración
```bash
dotnet ef migrations add NombreDeLaMigracion
```

### Aplicar migraciones
```bash
dotnet ef database update
```

### Revertir migración
```bash
dotnet ef database update NombreMigracionAnterior
```

### Compilar proyecto
```bash
dotnet build
```

### Limpiar compilación
```bash
dotnet clean
```

---

## 🌍 URLs de la Aplicación

- **HTTP:** `http://localhost:5299`
- **HTTPS:** `https://localhost:7024`
- **Swagger:** `http://localhost:5299/`
- **API Base:** `http://localhost:5299/api`

---

## ⚠️ Notas de Seguridad

> **⚠️ ADVERTENCIA:** Este proyecto es una demostración y **NO debe usarse en producción** sin las siguientes mejoras de seguridad:

1. **Contraseñas:** Actualmente se almacenan en texto plano. Implementar hashing (BCrypt, Argon2, etc.)
2. **JWT Tokens:** Agregar autenticación basada en tokens JWT
3. **Autorización:** Implementar roles y políticas de acceso
4. **Validación:** Fortalecer validaciones de entrada
5. **HTTPS:** Forzar uso de HTTPS en producción

---

## 🚧 Próximas Mejoras

- [ ] Implementar JWT para autenticación stateless
- [ ] Hash de contraseñas con BCrypt
- [ ] Validaciones con Data Annotations y FluentValidation
- [ ] Manejo global de errores
- [ ] Logging con Serilog
- [ ] Pruebas unitarias con xUnit
- [ ] Docker support
- [ ] CI/CD con GitHub Actions

---

## 👨‍💻 Autor

**Mateo** - Proyecto de evaluación para Ofima

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🤝 Conexión con Frontend

Este backend está diseñado para trabajar con un frontend Angular. Para conectar:

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5299/api'
};
```

---

## 📞 Soporte

Si encuentras algún problema:
1. Revisa la consola de la aplicación
2. Verifica que SQL Server LocalDB esté corriendo
3. Asegúrate de haber aplicado las migraciones
4. Revisa los logs en la consola

---

**⭐ Si este proyecto te fue útil, no olvides darle una estrella en GitHub!**
