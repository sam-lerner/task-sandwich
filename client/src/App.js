import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Home, Profile } from './pages';
import { Header, Nav, Footer, LoginForm, SignupForm } from './components';


function App() {
  return (
    <ApolloProvider>
      <Header />
      <Nav />
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
