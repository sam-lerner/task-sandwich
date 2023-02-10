import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import './App.css';

import { Home, Profile, Projects, BadNav } from './pages';
import { Header, Nav, Footer, LoginForm, SignupForm } from './components';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header />
      <Router>
      <Nav />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/projects"
            element={<Projects />}
          />
          <Route 
            path='*'
            element={<BadNav />}
          />
        </Routes>
      </Router>
      <Footer />
      </ApolloProvider>
    </>
  );
}

export default App;
