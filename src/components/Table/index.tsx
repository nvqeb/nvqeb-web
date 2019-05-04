// MARK: React
import * as React from "react";
import "./style.scss";

// MARK: Mobx
import { observer } from "mobx-react";

// MARK: Components
import MTable from "@material-ui/core/Table";
import MTableBody from "@material-ui/core/TableBody";
import MToolbar from "@material-ui/core/Toolbar";
import MTypography, { TypographyClassKey } from "@material-ui/core/Typography";
import MPaper from "@material-ui/core/Paper";
import MLinearProgress from "@material-ui/core/LinearProgress";
import TableHeader from "./TableHeader";
import TableRow, { IRowItem } from "./TableRow";
import TableFooter from "./TableFooter";

interface IProps {
	headerView?: React.ReactNode;
	rows: IRowItem[];
	pageOffset: number;
	title: string;
	tableIsEmptyMessage: string;
	loading: boolean;
	toolbar?: React.ReactNode;
	nextPage: () => void;
	prevPage: () => void;
	onAddClick?: () => void;
	onDetailsClick?: (id: string) => void;
	onDeleteClick?: (id: string) => void;
	onEditClick?: (id: string) => void;
	onClick?: (id: string) => void;
}

@observer
export default class Table extends React.Component<IProps> {
	public render() {
		const {
			pageOffset, nextPage, prevPage,
			loading, rows, onAddClick,
			onEditClick, onDeleteClick, onClick,
			title, headerView,
			toolbar, onDetailsClick,
			tableIsEmptyMessage,
		} = this.props;

		return (
			<MPaper>
				<MLinearProgress style={{ visibility: loading ? "visible" : "hidden", borderRadius: "20px" }} />
				<MToolbar style={{ display: "flex", justifyContent: "space-between", boxSizing: "border-box", width: "100%" }}>
					<MTypography variant="h6">{title}</MTypography>
					<div className="tableTools">
						{toolbar && toolbar}
					</div>
				</MToolbar>
				{headerView}
				{rows.length > 0 ?
					<div className="overflowX">
						<MTable>
							<TableHeader
								header={rows[0].columns.map((column) => column.columnName)}
								hasEdit={!!onEditClick}
								hasDelete={!!onDeleteClick}
							/>
							<MTableBody>
								{
									rows.map((item, index) => (
										<TableRow
											key={`${item.id}-row-${index}`}
											rowItem={item}
											onDeleteClick={onDeleteClick}
											onEditClick={onEditClick}
											onDetailsClick={onDetailsClick}
											onClick={onClick}
										/>
									))
								}
							</MTableBody>
						</MTable>
					</div> :
					!loading && <>
						<MTypography align="center">{tableIsEmptyMessage}</MTypography>
					</>
				}
				<TableFooter
					pageOffset={pageOffset + 1}
					onNextClick={nextPage}
					onPrevClick={prevPage}
					onAddClick={onAddClick}
					numberOfColumns={rows.length > 0 ? rows[0].columns.length : 0}
				/>
			</MPaper>
		);
	}
}
