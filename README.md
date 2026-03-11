# Sistema de Gestión de Empleados

Aplicación web Angular para la gestión de empleados con autenticación, operaciones CRUD y enrutamiento.

## Características

- Autenticación de usuarios (login/logout)
- Gestión de empleados (Crear, Leer, Actualizar, Eliminar)
- Diseño responsivo con CSS
- Enrutamiento Angular entre componentes
- Estructura de proyecto limpia y simple

## Tecnologías Utilizadas

### Frontend
- **Angular 17**
- **TypeScript**
- **HTML**
- **CSS**
- **Angular Forms**
- **Angular Router**

### Backend (API)
- **C#**
- **ASP.NET Core Web API**
- **Entity Framework**
- **SQL Server**
- **JWT (JSON Web Token)** para autenticación

## Estructura del Proyecto

```
src/
├── app/
│   ├── app.component.ts/html/css
│   ├── app.module.ts
│   ├── app-routing.module.ts
│   ├── login/
│   │   ├── login.component.ts/html/css
│   ├── employee-list/
│   │   ├── employee-list.component.ts/html/css
│   ├── employee-form/
│   │   ├── employee-form.component.ts/html/css
│   ├── register/
│   │   ├── register.component.ts/html/css
│   ├── auth.service.ts
│   └── employee.service.ts
├── index.html
├── main.ts
└── styles.css
```

## Instalación

1. Instalar Node.js y npm
2. Instalar Angular CLI: `npm install -g @angular/cli`
3. Instalar dependencias: `npm install`
4. Iniciar servidor de desarrollo: `ng serve`

## Uso

### Login
- Navegar a la página de login
- Usar credenciales de demostración:
  - Username: `admin`
  - Password: `admin`

### Gestión de Empleados
- Ver todos los empleados en la lista
- Agregar nuevos empleados con el botón "Agregar Empleado"
- Editar empleados existentes con el botón "Editar"
- Eliminar empleados con el botón "Eliminar"

## Componentes

- **LoginComponent**: Maneja la autenticación de usuarios
- **EmployeeListComponent**: Muestra la lista de todos los empleados
- **EmployeeFormComponent**: Formulario para agregar/editar empleados
- **RegisterComponent**: Formulario de registro de usuarios
- **AuthService**: Servicio para gestionar autenticación
- **EmployeeService**: Servicio para gestionar datos de empleados

## Enrutamiento

- `/login` - Página de login
- `/register` - Página de registro
- `/employees` - Lista de empleados
- `/employees/new` - Agregar nuevo empleado
- `/employees/edit/:id` - Editar empleado existente

## Scripts Disponibles

- `ng serve` - Iniciar servidor de desarrollo
- `ng build` - Construir para producción
- `ng test` - Ejecutar pruebas unitarias
- `ng lint` - Ejecutar linting
