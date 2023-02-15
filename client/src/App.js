import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import './App.css';

import { Home, Profile, Project, BadNav, Team } from './pages';
import { Header, Nav, Footer } from './components';

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

const ProjectWrapper = () => {
  const { id } = useParams();
  return <Project projectID={id} />;
}
const TeamWrapper = () => {
  const { id } = useParams();
  return <Team teamID={id} />;
}

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
              path="/project/:id"
              element={<ProjectWrapper />}
            />
            <Route
              path="/team/:id"
              element={<TeamWrapper />}
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
