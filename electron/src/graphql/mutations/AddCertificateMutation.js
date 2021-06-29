import {  gql } from '@apollo/client';

export default  gql`
  mutation AddCertificate(
    $type: String!
    $title: String!
    $location: String!
    $achievDate: String!
    $expirationDate: String!
    $employeeId: Int!
  ) {
    addCertificate(
      type: $type
      title: $title
      location: $location
      achievDate: $achievDate
      expirationDate: $expirationDate
      employeeId: $employeeId
    ) {
      id
      type
      title
    }
  }
`;
