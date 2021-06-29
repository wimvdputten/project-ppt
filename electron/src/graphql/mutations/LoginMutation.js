import {  gql } from '@apollo/client';

export default  gql`
    mutation Login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
            token
        }
    }

`;
