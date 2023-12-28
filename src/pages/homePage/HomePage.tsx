import MatchupForm from "../../components/matchups/MatchupForm";
import NavBar from "../../components/navBar/NavBar";
import useUser from "../../hooks/userHook";
import './HomePage.css';

export default function HomePage() {
	const user = useUser();
	if (!user) {
		return (
			<div className="App">
				<div className="navigation">
					<NavBar />
				</div>

				{/* TODO: Create a fun please log in component */}
				<div>Please log in to view content.</div>
			</div>
		)
	}
	
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
