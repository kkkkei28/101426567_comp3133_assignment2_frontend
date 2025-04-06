import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { provideApolloClient } from '../../graphql/apollo.service';
import { Router } from '@angular/router'; // ✅ import Router


const LOGIN_QUERY = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      email
    }
  }
`;

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
  providers: [provideApolloClient]
})
export class LoginComponent {
  email = '';
  password = '';
  username = '';
  error = '';
  message = '';
  isSignupMode = false;

  constructor(private apollo: Apollo, private router: Router) {}

  toggleMode() {
    this.isSignupMode = !this.isSignupMode;
    this.error = '';
    this.message = '';
  }

  login() {
    this.apollo
      .watchQuery({
        query: LOGIN_QUERY,
        variables: {
          email: this.email,
          password: this.password,
        },
      })
      .valueChanges.subscribe({
        next: (result: any) => {
          const token = result.data.login.token;
          localStorage.setItem('token', token);
          alert('Login successful!');
          this.router.navigate(['/view-employees']); 
        },
        error: (err) => {
          this.error = err.message;
        },
      });
  }

  signup() {
    this.apollo
      .mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
          username: this.username,
          email: this.email,
          password: this.password,
        },
      })
      .subscribe({
        next: () => {
          this.message = 'Signup successful! You can now login.';
          this.isSignupMode = false;
          this.username = '';
          this.email = '';
          this.password = '';
        },
        error: (err) => {
          this.error = err.message;
        },
      });
  }
}
