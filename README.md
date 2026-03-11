# Employee App

An Angular application for managing employees with login, CRUD operations, and routing.

## Features

- User authentication (login/logout)
- Employee management (Create, Read, Update, Delete)
- Responsive design with CSS styling
- Angular routing between components
- Clean and simple project structure

## Project Structure

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
│   └── employee.service.ts
├── index.html
├── main.ts
└── styles.css
```

## Installation

1. Install Node.js and npm
2. Install Angular CLI: `npm install -g @angular/cli`
3. Install dependencies: `npm install`
4. Run the development server: `ng serve`

## Usage

### Login
- Navigate to the login page
- Use demo credentials:
  - Username: `admin`
  - Password: `admin`

### Employee Management
- View all employees in the employee list
- Add new employees using the "Add Employee" button
- Edit existing employees by clicking the "Edit" button
- Delete employees using the "Delete" button

## Components

- **LoginComponent**: Handles user authentication
- **EmployeeListComponent**: Displays list of all employees
- **EmployeeFormComponent**: Form for adding/editing employees
- **EmployeeService**: Service for managing employee data

## Routing

- `/login` - Login page
- `/employees` - Employee list page
- `/employees/new` - Add new employee
- `/employees/edit/:id` - Edit existing employee

## Development

This project was generated with Angular CLI version 17.0.0.

### Available Scripts

- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng lint` - Run linting

## Technologies Used

- Angular 17
- TypeScript
- CSS
- Angular CLI
- Angular Forms
- Angular Router
