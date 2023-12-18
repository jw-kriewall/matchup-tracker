import DataTable from "../dataTable/DataTable";
import NavBar from "../navBar/NavBar";

export default function TablePage() {
	return (
		<div className="App">
			<div className="navigation">
				<NavBar />
			</div>

			<div className="data-table">
				<DataTable />
			</div>
		</div>
	);
}
