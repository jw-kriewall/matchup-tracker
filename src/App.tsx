import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MatchupForm from './components/MatchupForm';

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
