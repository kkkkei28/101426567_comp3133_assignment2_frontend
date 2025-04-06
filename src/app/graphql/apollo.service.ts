// src/app/graphql/apollo.service.ts
import { provideApollo } from 'apollo-angular';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client/core';

export const provideApolloClient = provideApollo(() => {
  return {
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:4001/graphql',
      fetch,
    }),
  };
});
