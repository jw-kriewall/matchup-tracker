import * as React from "react";
import Typography from "@mui/material/Typography";
import { Matchup } from "../../../types/MatchupModels";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getMatchups } from "../../../apiCalls/matchups/getMatchups";
import { store } from "../../../data/store";
import Box from "@mui/material/Box";
import { deleteSingleMatchup } from "../../../apiCalls/matchups/deleteMatchup";
import { useCookies } from "react-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Collapse,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useTheme,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "./AccordionMatchup.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
//https://mui.com/base-ui/react-table-pagination/

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement>,
		newPage: number
	) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleBackButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, page + 1);
	};

	return (
		<Box sx={{ flexShrink: 0, margin: 0 }}>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
		</Box>
	);
}

export default function ControlledAccordions() {
	const matchups: Matchup[] | undefined = useAppSelector(
		(state) => state.matchupReducer.matchups
	);
	const [userCookies] = useCookies(["user"]);
	const user = userCookies["user"];
	const [cookies] = useCookies(["format"]);

	const [loading, setLoading] = React.useState<boolean>(false);
	const [isInitialized, setInitialized] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState<{ [key: number]: boolean }>({});
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [page, setPage] = React.useState(0);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const dispatch = useAppDispatch();

	const handleDeleteMatchup = (matchup: Matchup) => async () => {
		if (user) {
			// console.log(matchup);
			setLoading(true);
			try {
				await dispatch(deleteSingleMatchup({ user, matchup })).unwrap();
				dispatch(getMatchups({ user: user, format: cookies.format }));
			} catch (error) {
				console.error("Failed to delete matchup:", error);
			} finally {
				setOpen({});
				setLoading(false);
			}
		}
	};

	const handleClick = (index: number) => {
		setOpen((prevOpen: any) => ({
			...prevOpen,
			[index]: !prevOpen[index],
		}));
	};

	const getMatchupsIfAuthorized = () => {
		if (user && matchups.length === 0) {
			dispatch(getMatchups({ user: user, format: cookies.format }))
				.unwrap()
				.then(handleInit)
				.catch((error: any) => {
					console.log(error);
				});
		}
	};

	React.useEffect(() => {
		if (!isInitialized && user) {
			getMatchupsIfAuthorized();
		}
	}, [isInitialized]);

	function handleInit() {
		const currentState: any = store.getState();

		if (currentState.matchups > 0) {
			setInitialized(true);
		}
	}

	return (
		<div className="matchup-accordion">
			{loading ? (
				// @TODO: Create a loading component
				<h3>LOADING...</h3>
			) : (
				<>
					<TablePagination
						className="table-pagination"
						rowsPerPageOptions={[10, 25, 100, { label: "All", value: -1 }]}
						colSpan={2}
						count={matchups.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
					/>
					<TableContainer
						component={Paper}
						sx={{ maxHeight: 500, minHeight: 500 }}
					>
						<Table aria-label="collapsible table" stickyHeader>
							
							<TableHead>
								<TableRow>
									<TableCell />
									<TableCell align="left">Game</TableCell>
									<TableCell align="center">Matchup</TableCell>
									<TableCell align="center">Winner</TableCell>
									<TableCell align="center">Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{matchups
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((matchup, index) => (
										<React.Fragment key={index}>
											<TableRow>
												<TableCell>
													<Button onClick={() => handleClick(index)}>
														{open[index] ? (
															<KeyboardArrowUpIcon />
														) : (
															<KeyboardArrowDownIcon />
														)}
													</Button>
												</TableCell>
												<TableCell component="th" scope="row" align="left">
													{matchups.length - (page * rowsPerPage + index)}
												</TableCell>
												
												<TableCell align="center">
													{matchup.startingPlayer === matchup.playerOneName && matchup.startingPlayer !== "" && (
														<ArrowRightIcon
															sx={{ verticalAlign: "middle", fontSize: "small" }}
														/>
													)}
													{matchup.playerOneDeck.name} <b>VS</b>{" "}
													{matchup.playerTwoDeck.name} 
													{matchup.startingPlayer === matchup.playerTwoName && matchup.startingPlayer !== "" && (
														<ArrowLeftIcon
															sx={{ verticalAlign: "middle", fontSize: "small"}}
														/>
													)}
												</TableCell>

												<TableCell align="center">
													{matchup.winningDeck}
												</TableCell>
												<TableCell align="center">
													<Button
														variant="outlined"
														color="error"
														onClick={() => handleDeleteMatchup(matchup)()}
													>
														<DeleteIcon />
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell
													style={{ paddingBottom: 0, paddingTop: 0 }}
													colSpan={6}
												>
													<Collapse
														in={open[index]}
														timeout="auto"
														unmountOnExit
													>
														<Box margin={1}>
															<Typography>
																<strong>Starting Player:</strong>{" "}
																{matchup.startingPlayer ? (
																	<>
																		{matchup.startingPlayer} with{" "}
																		{matchup.startingPlayer ===
																		matchup.playerOneName
																			? matchup.playerOneDeck.name
																			: matchup.playerTwoDeck.name}
																	</>
																) : (
																	"Not Specified"
																)}
															</Typography>
															<Typography>
																<b>Notes:</b> {matchup.notes}
															</Typography>
														</Box>
													</Collapse>
												</TableCell>
											</TableRow>
										</React.Fragment>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
		</div>
	);
}
