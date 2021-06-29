import {  gql } from '@apollo/client';

export default  gql`
  query {
    employees {
      id
      firstName
      lastName
      email
      function
      city
      certificates {
        id
        title
        type
        location
        expirationDate
        achievDate
      }
      vacations {
        id
        description
        startDate
        endDate
      }
    }
  }
`;
