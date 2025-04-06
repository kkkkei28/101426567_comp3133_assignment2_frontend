import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { provideApolloClient } from '../../graphql/apollo.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../app/auth.service'; // ✅ Make sure this path is correct
import { Router } from '@angular/router'; // ✅ add this at the top

const GET_ALL_EMPLOYEES = gql`
  query {
    getAllEmployees {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

@Component({
  selector: 'app-view-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css'],
  providers: [provideApolloClient]
})
export class ViewEmployeesComponent implements OnInit {
  employees: any[] = [];
  error: string = '';

  searchDesignation = '';
  searchDepartment = '';

  constructor(private apollo: Apollo, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_ALL_EMPLOYEES
    })
    .valueChanges
    .subscribe({
      next: result => {
        this.employees = result.data.getAllEmployees;
      },
      error: err => {
        this.error = err.message;
      }
    });
  }

  deleteEmployee(id: string) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.apollo
      .mutate({
        mutation: DELETE_EMPLOYEE,
        variables: { id },
      })
      .subscribe({
        next: () => {
          this.employees = this.employees.filter(emp => emp.id !== id);
        },
        error: (err) => {
          alert('Delete failed: ' + err.message);
        },
      });
  }

  get filteredEmployees() {
    return this.employees.filter(emp => {
      const matchesDesignation = this.searchDesignation
        ? emp.designation?.toLowerCase().includes(this.searchDesignation.toLowerCase())
        : true;

      const matchesDepartment = this.searchDepartment
        ? emp.department?.toLowerCase().includes(this.searchDepartment.toLowerCase())
        : true;

      return matchesDesignation && matchesDepartment;
    });
  }

  // ✅ Logout method
  logout(): void {
    this.authService.logout();
  }

  goToCreate() {
    this.router.navigate(['/create-employee']); // ✅ navigate to create page
  }
  goToEdit(id: string) {
    this.router.navigate(['/update-employee', id]);
  }
  
  goToView(id: string) {
    this.router.navigate(['/employee-details', id]);
  }
}
