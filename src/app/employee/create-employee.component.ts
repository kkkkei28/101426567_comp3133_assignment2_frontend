import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CommonModule } from '@angular/common';
import { provideApolloClient } from '../graphql/apollo.service';
import { Router } from '@angular/router';

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $gender: String,
    $designation: String!,
    $salary: Float!,
    $date_of_joining: String!,
    $department: String!,
    $image: String
  ) {
    addEmployee(
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      gender: $gender,
      designation: $designation,
      salary: $salary,
      date_of_joining: $date_of_joining,
      department: $department,
      image: $image
    ) {
      id
      first_name
      last_name
    }
  }
`;

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
  providers: [provideApolloClient]
})
export class CreateEmployeeComponent {
  employee: any = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: '',
    date_of_joining: '',
    department: '',
    image: ''
  };

  message = '';
  selectedImage: File | null = null;

  constructor(private apollo: Apollo, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.employee.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: this.employee
    }).subscribe({
      next: () => {
        this.message = 'Employee created!';
        this.employee = {
          first_name: '',
          last_name: '',
          email: '',
          gender: '',
          designation: '',
          salary: '',
          date_of_joining: '',
          department: '',
          image: ''
        };
        this.selectedImage = null;
      },
      error: (err) => {
        this.message = 'Error: ' + err.message;
      }
    });
  }

  goHome() {
    this.router.navigate(['/view-employees']);
  }
}
