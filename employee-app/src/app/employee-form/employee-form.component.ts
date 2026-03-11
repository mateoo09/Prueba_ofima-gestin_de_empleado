import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required, Validators.minLength(2)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      salary: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadEmployee(+id);
    }
  }

  loadEmployee(id: number): void {
    this.isLoading = true;
    
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        if (employee) {
          this.employeeForm.patchValue({
            name: employee.name,
            email: employee.email,
            department: employee.department,
            position: employee.position,
            salary: employee.salary
          });
        } else {
          this.errorMessage = 'Employee not found';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load employee. Please try again.';
        this.isLoading = false;
        console.error('Error loading employee:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.markFormGroupTouched(this.employeeForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const employeeData: Employee = {
      id: 0, // Will be set by the service for new employees
      name: this.employeeForm.get('name')?.value,
      email: this.employeeForm.get('email')?.value,
      department: this.employeeForm.get('department')?.value,
      position: this.employeeForm.get('position')?.value,
      salary: this.employeeForm.get('salary')?.value
    };

    if (this.isEdit) {
      // Update existing employee
      const id = +this.route.snapshot.paramMap.get('id')!;
      employeeData.id = id;
      
      this.employeeService.updateEmployee(employeeData).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
          alert('Employee updated successfully');
        },
        error: (error) => {
          this.errorMessage = 'Failed to update employee. Please try again.';
          this.isLoading = false;
          console.error('Error updating employee:', error);
        }
      });
    } else {
      // Create new employee
      this.employeeService.addEmployee(employeeData).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to create employee. Please try again.';
          this.isLoading = false;
          console.error('Error creating employee:', error);
        }
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }

  // Helper getters for template
  get name() {
    return this.employeeForm.get('name');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get department() {
    return this.employeeForm.get('department');
  }

  get position() {
    return this.employeeForm.get('position');
  }

  get salary() {
    return this.employeeForm.get('salary');
  }
}
