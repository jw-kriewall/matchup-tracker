import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MatchupForm from './components/MatchupForm';
import LoginPage from './components/login/LoginPage';

//const clientId = "946171427391-9q1lkna1ibpgq49g2fivl8m2edg6304a.apps.googleusercontent.com";

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
