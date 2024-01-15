import React from "react";
import MatchupForm from "../../components/matchups/MatchupForm";
import NavBar from "../../components/navBar/NavBar";
import useUser from "../../hooks/userHook";
import "./HomePage.css";
import { useCookies } from "react-cookie";

export default function HomePage() {
  const user = useUser();
  const [cookies] = useCookies(["userRole"]);
  const userRole = cookies["userRole"].payload;

  if (!user) {
    return (
      <div className="App">
        <div className="navigation">
          <NavBar />
        </div>

        {/* TODO: Create a fun log in component */}
        <div>Please log in to view content.</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="navigation">
        <NavBar />
      </div>

      {userRole === "user" ? <h1>user</h1> : <h1>admin</h1>}

      <div className="matchup-form">
        <MatchupForm />
      </div>
    </div>
  );
}
