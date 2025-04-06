import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { provideApolloClient } from '../../graphql/apollo.service';


const SEARCH_EMPLOYEES = gql`
  query SearchEmployeeByDesignationOrDepartment($designation: String, $department: String) {
    searchEmployeeByDesignationOrDepartment(designation: $designation, department: $department) {
      id
      first_name
      last_name
      email
      gender
      designation
      department
      salary
      date_of_joining
    }
  }
`;

@Component({
  selector: 'app-search-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css'],
  providers: [provideApolloClient]
})
export class SearchEmployeeComponent {
  designation = '';
  department = '';
  employees: any[] = [];
  error = '';

  constructor(private apollo: Apollo) {}

  search() {
    this.apollo
      .watchQuery({
        query: SEARCH_EMPLOYEES,
        variables: {
          designation: this.designation || null,
          department: this.department || null
        }
      })
      .valueChanges.subscribe({
        next: (result: any) => {
          this.employees = result.data.searchEmployeeByDesignationOrDepartment;
          this.error = '';
        },
        error: (err) => {
          this.error = 'Search failed: ' + err.message;
          this.employees = [];
        }
      });
  }
}
