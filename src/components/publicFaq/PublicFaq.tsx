import { IconButton } from "@mui/material";
import "./PublicFaq.css";
import XIcon from "@mui/icons-material/X";
import { handleTwitterClick } from "../shared/navigateToX";

export default function PublicFaq() {
	return (
		<div className="faq-container">
			<div className="faq-header">
				<h1>Welcome to counterplay.gg |
                <IconButton onClick={handleTwitterClick} aria-label="twitter">
					<XIcon />
				</IconButton>
                </h1>
				
			</div>
				<p>The Pokémon TCG's premier data aggregation and simulation tool!</p>

			<div>
				<h2 className="faq-question">Why would I use this site?</h2>
                <p className="faq-answer">High level players already track their testing results and decide their decks based on spreadsheets - so why wouldn't you?</p>
				<p className="faq-answer">
					Instead of relying on other aggregation websites to show matchup
					win rates, users can use counterplay.gg to track their own results. They can then use their
					data to simulate tournaments, helping make more informed deck
					choices for their next tournament.{" "}
				</p>
			</div>

			<div>
				<h2 className="faq-question">How do I log in?</h2>
				<p className="faq-answer">
					The site currently supports logging in via your Google account.
				</p>
			</div>

			<div>
				<h2 className="faq-question">How many games can I save?</h2>
				<p className="faq-answer">
					The current limit is 300, though there will be plans to increase this.
				</p>
			</div>

			<div>
				<h2 className="faq-question">
					Why are all the decks in the post-rotation format?
				</h2>
				<p className="faq-answer">
					This website is future-facing. With players looking to test for
					upcoming tournaments in the new format, focus has been shifted
					to the new post-rotation "F-on" format.
				</p>
			</div>

			<div>
				<h2 className="faq-question">
					I don't see the deck I'm playing in the dropdown. Can I create a new
					deck option?
				</h2>
				<p className="faq-answer">This feature is coming soon!</p>
			</div>

			<div>
				<h2 className="faq-question">Can counterplay parse PTCGL gamelogs?</h2>
				<p className="faq-answer">
					Yes! For speed and ease of use, counterplay.gg can autofill fields on the data
					input page. Simply paste your log into the notes section and
					counterplay will do the rest! Keep in mind, this feature currently
					accounts for decks in a post-rotation "F-on" format which may not be
					the current format on PTCGLive.
				</p>
			</div>

			<div>
				<h2 className="faq-question">
					Counterplay is still in beta. What does that mean?
				</h2>
				<p className="faq-answer">
					Since there are new features being added weekly, databases may need to
					be adjusted or deleted. Every attempt will be made to preserve data
					and notify users about upcoming changes. Follow 
                    {" "}
                    <a href="https://twitter.com/counterplaypkmn" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>@counterplaypkmn</a> 
                    {" "}or{" "} 
                    <a href="https://twitter.com/RealJohnWalter" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>@RealJohnWalter</a> 
                    {" "}
                    on X for the latest information.
				</p>
			</div>

            <div>
				<h4 className="faq-question">
					Have a question or suggestion? Email at flexdaddyrighteous@gmail.com
				</h4>
			</div>
		</div>
	);
}
