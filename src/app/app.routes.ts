import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'create-employee',
    loadComponent: () => import('./employee/create-employee.component').then(m => m.CreateEmployeeComponent)
  },
  {
    path: 'view-employees',
    loadComponent: () =>
      import('./employee/view-employees/view-employees.component').then(m => m.ViewEmployeesComponent)
  },
  {
    path: 'update-employee/:id',
    loadComponent: () =>
      import('./employee/update-employee/update-employee.component').then(m => m.UpdateEmployeeComponent),
  },
  {
    path: 'search-employee',
    loadComponent: () =>
      import('./employee/search-employee/search-employee.component').then(m => m.SearchEmployeeComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'employee-details/:id',
    loadComponent: () =>
      import('./employee/employee-details/employee-details.component').then(
        (m) => m.EmployeeDetailsComponent
      ),
  }
  
  
  
  
  
];
