import {  gql } from '@apollo/client';

export default  gql`
  mutation AddVacation(
    $description: String!
    $startDate: String!
    $endDate: String!
    $employeeId: Int!
  ) {
    addVacation(
      description: $description
      startDate: $startDate
      endDate: $endDate
      employeeId: $employeeId
    ) {
      id
      description
      startDate
      endDate
    }
  }
`;
