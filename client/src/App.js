import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider
// } from "@apollo/client";

// import { setContext } from "@apollo/client/link/context";

import './App.css';

import { Home, Profile, Project } from './pages';
import { Header, Nav, Footer, LoginForm, SignupForm } from './components';

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <>
    {/* <ApolloProvider client={client}> */}
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
            path="/project"
            element={<Project />}
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>That's not a real page!</h1>}
          />
        </Routes>
      </Router>
      <Footer />
      {/* </ApolloProvider> */}
    </>
  );
}

export default App;
