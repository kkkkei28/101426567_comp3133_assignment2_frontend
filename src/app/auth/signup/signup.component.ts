import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { provideApolloClient } from '../../graphql/apollo.service';

const SIGNUP = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [provideApolloClient]
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private apollo: Apollo) {}

  signup() {
    this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        username: this.username,
        email: this.email,
        password: this.password
      }
    }).subscribe({
      next: () => {
        this.message = 'Signup successful!';
        this.error = '';
      },
      error: err => {
        this.message = '';
        this.error = err.message;
      }
    });
  }
}
