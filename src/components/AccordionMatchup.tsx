import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';



type Matchup = {
  id: number,
  playerOneName: string,
  playerOneDeck: {
            name: string,
            cards: string
        },
        playerTwoName: string,
        playerTwoDeck: {
            name: string,
            cards: string
        },
        startingPlayer: string,
      winningDeck: string,
        format: string,
        notes: string
}

export default function ControlledAccordions(props: any) {
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
    

  return (
    <div className="matchup-accordion">

      {
        (matchupArray.map((matchup) => 
        <h1>{matchup.playerOneDeck.name} VS {matchup.playerTwoDeck.name}</h1>))
      }

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Game # 
            {/* Array of games, display array # */}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Matchup winner: {props.winningDeck}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Game 
            </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Matchup winner: {props.winningDeck}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>

      
      </Accordion>
    </div>
  );
}