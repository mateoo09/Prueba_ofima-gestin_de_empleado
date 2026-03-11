import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;
  private employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      salary: 85000
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      salary: 75000
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      salary: 65000
    }
  ];

  private nextId: number = 4;

  constructor(private http: HttpClient) { }

  // API call to get employees
  getEmployeesFromAPI(): Observable<Employee[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<Employee[]>(`${this.apiUrl}/Employees`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching employees from API:', error);
          // Fallback to mock data if API fails
          return of(this.getMockEmployees());
        })
      );
  }

  // Mock data for fallback
  getMockEmployees(): Employee[] {
    return this.employees;
  }

  // Legacy method for backward compatibility
  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<Employee>(`${this.apiUrl}/Employees/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching employee from API:', error);
          // Fallback to mock data
          return of(this.employees.find(emp => emp.id === id));
        })
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Employee>(`${this.apiUrl}/Employees`, employee, { headers })
      .pipe(
        catchError(error => {
          console.error('Error adding employee to API:', error);
          // Fallback to mock data
          employee.id = this.nextId++;
          this.employees.push(employee);
          return of(employee);
        })
      );
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Employee>(`${this.apiUrl}/Employees/${updatedEmployee.id}`, updatedEmployee, { headers })
      .pipe(
        catchError(error => {
          console.error('Error updating employee in API:', error);
          // Fallback to mock data
          const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
          if (index !== -1) {
            this.employees[index] = updatedEmployee;
          }
          return of(updatedEmployee);
        })
      );
  }

  deleteEmployee(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete<void>(`${this.apiUrl}/Employees/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error deleting employee from API:', error);
          // Fallback to mock data
          this.employees = this.employees.filter(emp => emp.id !== id);
          return of(void 0);
        })
      );
  }
}
