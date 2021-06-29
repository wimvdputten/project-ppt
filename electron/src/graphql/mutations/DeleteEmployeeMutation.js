import {  gql } from '@apollo/client';

export default  gql`
  mutation DeleteEmployee($id: Int!) {
    deleteEmployee(id: $id) {
      id
    }
  }

`;
