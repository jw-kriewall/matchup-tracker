import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MatchupForm from './components/MatchupForm';
import LoginPage from './components/login/LoginPage';

function App() {
  return (
    <>
      <div className="App">
        <div className="navigation">
          <NavBar />
        </div>

        <div className="matchupForm">
          <MatchupForm />
        </div>
      </div>
    </>
  );
}

export default App;
