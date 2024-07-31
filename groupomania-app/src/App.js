import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage.js/index.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js/index.js';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/profile" component={UserProfilePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
