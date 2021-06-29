import React from 'react';
import {render} from 'react-dom';

import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react';
import {setContext} from '@apollo/client/link/context';
import App from './components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Employee:{
        keyFields:['id']
      }
    }
  }),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  );
};

render(<Root/>, document.querySelector('#root'));
