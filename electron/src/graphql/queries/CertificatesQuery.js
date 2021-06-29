import {  gql } from '@apollo/client';

export default  gql`
  query {
    certificates {
      id
      title
      expirationDate
    }
  }
`;
