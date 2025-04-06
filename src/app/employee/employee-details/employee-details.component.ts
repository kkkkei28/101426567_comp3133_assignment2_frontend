import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { provideApolloClient } from '../../graphql/apollo.service'; // ✅ Adjust path if needed
import { Router } from '@angular/router'; // ✅ Import this


const GET_EMPLOYEE_BY_ID = gql`
  query searchEmployeeByEid($id: ID!) {
    searchEmployeeByEid(id: $id) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      image
    }
  }
`;


@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  providers: [provideApolloClient]
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;
  error = '';

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.apollo
        .watchQuery({
          query: GET_EMPLOYEE_BY_ID,
          variables: { id }
        })
        .valueChanges.subscribe({
          next: (res: any) => {
            this.employee = res.data.searchEmployeeByEid;
          },
          error: (err) => {
            this.error = err.message;
          }
        });
    }
  }

  
  // add this method
  goHome() {
    this.router.navigate(['/view-employees']);
  }
}
