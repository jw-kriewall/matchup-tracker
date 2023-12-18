import MatchupForm from "../matchups/MatchupForm";
import NavBar from "../navBar/NavBar";

export default function HomePage() {
	return (
		<div className="App">
			<div className="navigation">
				<NavBar />
			</div>

			<div className="matchup-form">
				<MatchupForm />
			</div>
		</div>
	);
}
