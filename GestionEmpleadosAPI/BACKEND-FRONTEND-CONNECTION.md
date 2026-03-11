# 🔗 CONFIGURACIÓN DE CONEXIÓN BACKEND ↔️ FRONTEND

## 📋 INFORMACIÓN DEL BACKEND (ASP.NET Core)

### **URLs del Backend:**
- **HTTP:** `http://localhost:5299`
- **HTTPS:** `https://localhost:7024`

### **URLs importantes:**
- **Swagger UI:** `http://localhost:5299/` (se abre automáticamente)
- **API Base:** `http://localhost:5299/api`

---

## ✅ CONFIGURACIÓN COMPLETADA EN EL BACKEND:

### 1. **CORS Habilitado** ✅
```csharp
// Permite peticiones desde Angular (puerto 4200)
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

### 2. **Middleware CORS Aplicado** ✅
```csharp
app.UseCors("AllowAngular");
```

---

## 🌐 ENDPOINTS DISPONIBLES PARA ANGULAR:

### **🔐 AUTENTICACIÓN**

#### Login
```
POST http://localhost:5299/api/Auth/login
Content-Type: application/json

Body:
{
  "username": "admin",
  "password": "admin123"
}

Response 200 OK:
{
  "message": "Login successful"
}

Response 401 Unauthorized:
(Sin body)
```

---

### **👥 EMPLEADOS (Employees)**

#### 1. Obtener todos los empleados
```
GET http://localhost:5299/api/Employees

Response 200 OK:
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "position": "Developer",
    "salary": 55000
  }
]
```

#### 2. Obtener empleado por ID
```
GET http://localhost:5299/api/Employees/1

Response 200 OK:
{
  "id": 1,
  "name": "Juan Pérez",
  "position": "Developer",
  "salary": 55000
}

Response 404 Not Found:
(Si no existe)
```

#### 3. Crear empleado
```
POST http://localhost:5299/api/Employees
Content-Type: application/json

Body:
{
  "name": "María García",
  "position": "Designer",
  "salary": 50000
}

Response 201 Created:
{
  "id": 2,
  "name": "María García",
  "position": "Designer",
  "salary": 50000
}
```

#### 4. Actualizar empleado
```
PUT http://localhost:5299/api/Employees/1
Content-Type: application/json

Body:
{
  "id": 1,
  "name": "Juan Pérez Updated",
  "position": "Senior Developer",
  "salary": 65000
}

Response 204 No Content:
(Sin body)

Response 400 Bad Request:
(Si el ID del body no coincide con el ID de la URL)

Response 404 Not Found:
(Si no existe)
```

#### 5. Eliminar empleado
```
DELETE http://localhost:5299/api/Employees/1

Response 204 No Content:
(Sin body)

Response 404 Not Found:
(Si no existe)
```

---

### **👤 USUARIOS (Users)**

Los mismos endpoints que Employees, pero en la ruta `/api/Users`

#### 1. Obtener todos
```
GET http://localhost:5299/api/Users
```

#### 2. Obtener por ID
```
GET http://localhost:5299/api/Users/1
```

#### 3. Crear usuario
```
POST http://localhost:5299/api/Users
Content-Type: application/json

Body:
{
  "username": "testuser",
  "password": "test123"
}
```

#### 4. Actualizar usuario
```
PUT http://localhost:5299/api/Users/1
```

#### 5. Eliminar usuario
```
DELETE http://localhost:5299/api/Users/1
```

---

## 🚀 PROCEDIMIENTO PARA INICIAR EL BACKEND:

### **Opción 1: Desde Visual Studio (Recomendado)**
1. Presiona **F5** o haz clic en el botón ▶️ **GestionEmpleadosAPI**
2. Se abrirá Swagger automáticamente en `http://localhost:5299/`
3. Deja la aplicación corriendo (NO la cierres)
4. La consola mostrará: "Now listening on: http://localhost:5299"

### **Opción 2: Desde terminal PowerShell**
```powershell
cd C:\Users\Prueba\source\repos\GestionEmpleadosAPI\GestionEmpleadosAPI
dotnet run
```

---

## 📝 INFORMACIÓN PARA CONFIGURAR EN ANGULAR:

### **environment.ts** (Angular)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5299/api'  // ⬅️ URL base del backend
};
```

### **Ejemplo de servicio en Angular:**
```typescript
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/Employees`;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}
```

---

## ⚠️ IMPORTANTE:

### **Antes de ejecutar Angular:**
1. ✅ **El backend DEBE estar corriendo** en Visual Studio (F5)
2. ✅ **Verifica que veas:** "Now listening on: http://localhost:5299"
3. ✅ **Prueba Swagger:** Abre `http://localhost:5299/` en el navegador
4. ✅ **Mantén Visual Studio abierto** con la API corriendo

### **Puertos utilizados:**
- **Backend:** `http://localhost:5299` (ASP.NET Core)
- **Frontend:** `http://localhost:4200` (Angular - cuando ejecutes `ng serve`)

---

## 🧪 PROBAR LA CONEXIÓN:

### **Paso 1: Verificar que el backend responde**
Abre el navegador y ve a:
```
http://localhost:5299/api/Employees
```
Deberías ver un array JSON (puede estar vacío `[]` si no hay empleados).

### **Paso 2: Crear un usuario de prueba**
En Swagger (`http://localhost:5299/`):
1. Expande **POST /api/Users**
2. Click "Try it out"
3. Pega:
```json
{
  "username": "admin",
  "password": "admin123"
}
```
4. Click "Execute"

### **Paso 3: Probar login**
En Swagger:
1. Expande **POST /api/Auth/login**
2. Click "Try it out"
3. Pega:
```json
{
  "username": "admin",
  "password": "admin123"
}
```
4. Click "Execute"
5. Deberías ver: `{ "message": "Login successful" }`

---

## 📊 MODELOS DE DATOS:

### **Employee**
```typescript
{
  id?: number;        // Opcional al crear, generado por la BD
  name: string;       // Requerido
  position: string;   // Requerido
  salary: number;     // Requerido (decimal en C#)
}
```

### **User**
```typescript
{
  id?: number;        // Opcional al crear
  username: string;   // Requerido
  password: string;   // Requerido (sin encriptar en esta versión)
}
```

### **LoginRequest**
```typescript
{
  username: string;   // Requerido
  password: string;   // Requerido
}
```

---

## ✅ CHECKLIST ANTES DE CONECTAR CON ANGULAR:

- [ ] Backend compilado sin errores
- [ ] CORS configurado para `http://localhost:4200`
- [ ] Middleware CORS aplicado en `Program.cs`
- [ ] Base de datos conectada (LocalDB)
- [ ] Tablas creadas (Employees, Users)
- [ ] Al menos un usuario creado en la BD
- [ ] Backend corriendo en Visual Studio (F5)
- [ ] Swagger funcional en `http://localhost:5299/`
- [ ] Endpoints probados en Swagger

---

## 🎯 PRÓXIMO PASO:

**IR A WINDSURF** y configurar Angular con los servicios que consuman estas URLs.

**URL base para Angular:** `http://localhost:5299/api`

---

**Generado:** 2026-03-11
**Backend:** ASP.NET Core 8.0
**Frontend:** Angular (a configurar en Windsurf)
