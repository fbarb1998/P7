import logo from '../Groupomania_Logos/icon-above-font.png';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';

const App = () => {
  const userId = 1; // Example user ID

  return (
    <div className="app-container">
      <Header />
      <main>
        <UserProfile userId={userId} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
