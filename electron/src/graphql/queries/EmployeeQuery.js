import {  gql } from '@apollo/client';

export default  gql`
  query Employee($id: Int) {
    employee(id: $id) {
      id
      firstName
      lastName
      email
      function
      city
      houseNumber
      postalCode
      adres
      certificates {
        id
        title
        location
        description
        expirationDate
      }
    }
  }
`;
