import {gql} from '@apollo/client';

export default gql`
  mutation UpdateEmployee(
    $id: Int!,
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $city: String!,
    $adres: String!,
    $houseNumber: String!,
    $postalCode: String!,
    $function: String!,
  ){updateEmployee(
    id: $id
    firstName: $firstName
    lastName: $lastName
    email: $email
    city: $city
    adres: $adres
    houseNumber: $houseNumber
    postalCode: $postalCode
    function: $function
  ) {
    id
    firstName
    lastName
    email
    function
    city
    certificates {
      id
    }
  }
  }
`;


