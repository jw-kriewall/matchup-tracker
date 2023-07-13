import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { Matchup } from '../types/Matchup';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [matchupArray, setMatchupArray] = React.useState<Matchup[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  //   async function populateMatchupArray() {
  //       let response = fetch("http://localhost:8090/matchups/getAll",{
  //           method: "GET",
  //           headers: {"Content-Type" : "application/json"},
  //   }).then(() => {
  //     console.log("FETCH FROM API: " + JSON.stringify(response))
  //       setMatchupArray(matchupArray.fill(JSON.stringify(response)))
  //   })
  // }

    
    React.useEffect(() => {
        const loadMatchups = async () => {
          setLoading(true);

          const response = await axios.get("http://localhost:8090/matchups/getAll");
          setMatchupArray(response.data);

          console.log(response.data)

          setLoading(false)
        }
        loadMatchups();
    }, [])

    //@TODO: When I submit a matchup, it must populate on the screen
    

  return (
    <div className="matchup-accordion">

      {loading ? <h3>LOADING...</h3> :
        (matchupArray.reverse().map((matchup, index) => 
        // <div>
        //   <h4>{matchup.playerOneDeck.name} VS {matchup.playerTwoDeck.name}</h4>
        //   <h3>Winning Deck: {matchup.winningDeck}</h3>
        // </div>
      //   ))
      // }

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Game # {index + 1}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {matchup.playerOneDeck.name} VS {matchup.playerTwoDeck.name} <b>Winner: </b> {matchup.winningDeck}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>Starting Player: </b>{matchup.startingPlayer}
          </Typography>
          <Typography>
            <b>Notes: </b>{matchup.notes}
          </Typography>
        </AccordionDetails>
      </Accordion>
      ))
      }
    </div>
  );
}