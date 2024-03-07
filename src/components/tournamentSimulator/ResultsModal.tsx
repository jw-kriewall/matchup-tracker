import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

interface ResultsModalProps {
	open: boolean;
	handleClose: () => void;
	results: string[];
}

function formatIncomingResults(results: string[]) {
  return results.map((result, index) => (
    <Typography key={index} variant="body1" component="div" sx={{ textAlign: 'center', my: 1.5, fontWeight: index === 0 ? 'bold' : 'regular' }}>
      {index === 0 ? (
        <>
          <EmojiEventsIcon sx={{ verticalAlign: 'middle', fontSize: 'medium', color: '#ebcd49' }} />{result}<EmojiEventsIcon sx={{ verticalAlign: 'middle', fontSize: 'medium', color: '#ebcd49' }} />
        </>
      ) : index === 1 ? (
        <>
          <EmojiEventsIcon sx={{ verticalAlign: 'middle', fontSize: 'medium', color: '#C0C0C0' }} />{result}<EmojiEventsIcon sx={{ verticalAlign: 'middle', fontSize: 'medium', color: '#C0C0C0' }} />
        </>
      ) : index === 2 ? (
        <>
          <EmojiEventsIcon sx={{ verticalAlign: 'middle', fontSize: 'medium', color: '#eba549' }} />{result}<EmojiEventsIcon sx={{ verticalAlign: 'middle', fontSize: 'medium', color: '#eba549' }} />
        </>
      ) : (
        <Typography variant="body2">
          {result}
        </Typography>
      )}
    </Typography>
  ));
}

export default function ResultsModal({
	open,
	handleClose,
	results,
}: ResultsModalProps) {

  const formattedResults = formatIncomingResults(results);

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					{/* <Typography id="transition-modal-title" variant="h4" component="h2">
						Results
					</Typography> */}
					{formattedResults}
				</Box>
			</Fade>
		</Modal>
	);
}