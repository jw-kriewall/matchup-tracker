import NavBar from "../navBar/NavBar";

export default function TablePage() {
	const tableData = {
		columns: [
			"Charizard",
			"Entei Iron Valiant",
			"Gardevoir",
			"Giratina LZ Box",
			"Inteleon Urshifu",
			"Lost Box Charizard",
			"Lost Zone Box",
			"Miraidon Flaaffy",
			"Roaring Moon",
		],
		rows: [
			{
				"Charizard": "50.0",
				"Entei Iron Valiant": "57.3",
				"Gardevoir": "56.2",
				"Giratina LZ Box": "47.1",
				"Inteleon Urshifu": "36.9",
				"Lost Box Charizard": "47.5",
				"Lost Zone Box": "54.0",
				"Miraidon Flaaffy": "61.7",
				"Roaring Moon": "63.7",
			},
			// ... add all other rows here
		],
	};

	function getColor(value: string) {
		const num = parseFloat(value);
		if (num >= 51) return "#CCCCFF";
		if (num <= 49) return "#FFCCCC";
		return "#E8E8E8";
	}
	return (
		<>
			<div className="navigation">
				<NavBar />
			</div>

			<table>
				<thead>
					<tr>
						{tableData.columns.map((column, index) => (
							<th
								key={column}
								style={{
									backgroundColor: index % 2 === 0 ? "#F0F0F0" : "#D3D3D3",
									padding: "10px",
									border: "1px solid #ddd",
								}}
							>
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tableData.rows.map((row: any, index: any) => (
						<tr key={index}>
							{tableData.columns.map((column, columnIndex) => (
								<td
									key={column}
									style={{
										backgroundColor: getColor(row[column]),
										padding: "10px",
										border: "1px solid #ddd",
										textAlign: "center",
									}}
								>
									{row[column]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
