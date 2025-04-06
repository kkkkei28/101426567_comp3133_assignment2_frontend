import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { provideApolloClient } from '../../graphql/apollo.service';
import { ActivatedRoute, Router } from '@angular/router';

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    searchEmployeeByEid(id: $id) {
      first_name
      last_name
      email
      designation
      department
      image
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
    $designation: String
    $department: String
    $image: String
  ) {
    updateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      designation: $designation
      department: $department
      image: $image
    ) {
      id
      first_name
      last_name
      email
      designation
      department
      image
    }
  }
`;

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
  providers: [provideApolloClient],
})
export class UpdateEmployeeComponent implements OnInit {
  id = '';
  first_name = '';
  last_name = '';
  email = '';
  designation = '';
  department = '';
  image = ''; // base64 image string
  previewImage = ''; // for display
  message = '';
  loaded = false;
  error = '';

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute) {
      this.id = idFromRoute;

      this.apollo
        .watchQuery({
          query: GET_EMPLOYEE_BY_ID,
          variables: { id: this.id },
        })
        .valueChanges.subscribe({
          next: (result: any) => {
            const emp = result.data.searchEmployeeByEid;
            this.first_name = emp.first_name;
            this.last_name = emp.last_name;
            this.email = emp.email;
            this.designation = emp.designation;
            this.department = emp.department;
            this.image = emp.image || '';
            this.previewImage = this.image;
            this.loaded = true;
          },
          error: (err) => {
            this.error = 'Failed to fetch employee: ' + err.message;
          },
        });
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
        this.previewImage = this.image;
      };
      reader.readAsDataURL(file);
    }
  }

  updateEmployee() {
    this.apollo
      .mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: {
          id: this.id,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          designation: this.designation,
          department: this.department,
          image: this.image,
        },
      })
      .subscribe({
        next: () => {
          this.message = 'Employee updated!';
        },
        error: (err) => {
          this.message = 'Update failed: ' + err.message;
        },
      });
  }

  goHome() {
    this.router.navigate(['/view-employees']);
  }
}
