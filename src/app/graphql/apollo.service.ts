// src/app/graphql/apollo.service.ts
import { provideApollo } from 'apollo-angular';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client/core';

export const provideApolloClient = provideApollo(() => {
  return {
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://one01426567-comp3133-assignment2-backend.onrender.com/graphql',
      fetch,
    }),
  };
});
