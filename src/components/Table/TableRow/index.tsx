// MARK: React
import * as React from "react";
import "./style.scss";

// MARK: Mobx
import { observer } from "mobx-react";

// MARK: Components
import MTableCell from "@material-ui/core/TableCell";
import MaterialTableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

// MARK: Icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DetailsIcon from "@material-ui/icons/Search";

export enum ColumnType {
	image,
	avatar,
	text,
	link,
}

export interface IRowItem {
	id: string;
	columns: IColumnItem[];
}

export interface IColumnItem {
	columnName: string;
	type?: ColumnType;
	value: string | ILinkValue | null;
}

interface ILinkValue {
	src: string;
	name: string;
}

interface IProps {
	rowItem: IRowItem;
	onEditClick?: (id: string) => void;
	onDeleteClick?: (id: string) => void;
	onDetailsClick?: (id: string) => void;
	onClick?: (id: string) => void;
}

@observer
export default class TableRow extends React.Component<IProps> {
	/**
	 * Each item of the array is a column value in the in the Table row
	 * with you choose to add a edit/delete buttonm make sure adding -1 item on the
	 * data array, to the row matches with the header size.
	 */

	public render() {
		const { rowItem, onEditClick, onDeleteClick, onDetailsClick, onClick } = this.props;

		return (
			<MaterialTableRow hover tabIndex={-1} onClick={() => onClick && onClick(rowItem.id)}>
				{
					/**
					 * The additional Cell will only be placed if
					 * there is one of the callback functions: "onEditClick"
					 * or "onDeleteClick"
					 */
					(onEditClick || onDeleteClick) &&
					<MTableCell
						key={`${rowItem.id}-edit-or-delete`}
						align="center"
						padding="dense"
					>
						{onEditClick &&
							<IconButton
								onClick={(event) => {
									event.stopPropagation();
									onEditClick(rowItem.id);
								}}
							>
								<EditIcon />
							</IconButton>
						}
						{onDeleteClick &&
							<IconButton
								onClick={(event) => {
									event.stopPropagation();
									onDeleteClick(rowItem.id);
								}}
							>
								<DeleteIcon />
							</IconButton>
						}
						{onDetailsClick &&
							<IconButton
								onClick={(event) => {
									event.stopPropagation();
									onDetailsClick(rowItem.id);
								}}
							>
								<DetailsIcon />
							</IconButton>
						}
					</MTableCell>
				}
				{
					rowItem.columns.map((columnValue, index) => {
						return <MTableCell
							className="tableCell"
							key={`${rowItem.id}${index}`}
							align="center"
							padding="dense"
						>
							{(() => {
								switch (columnValue.type) {
									case ColumnType.avatar: {
										return (
											<div className="roundImageContainer">
												<img className="roundImage" src={columnValue.value as string || "/userPlaceholder.svg"} />
											</div>
										);
									}
									case ColumnType.image: {
										// TODO: Change this placeholder to a more generic placeholder image
										return (
											<div className="roundImageContainer">
												<img className="roundImage" src={columnValue.value as string || "/userPlaceholder.svg"} />
											</div>
										);
									}
									case ColumnType.link: {
										return columnValue.value ?
											<>
												<a href={(columnValue.value as ILinkValue).src} target="_blank" onClick={(event) => event.stopPropagation()}>
													{(columnValue.value as ILinkValue).name}
												</a>
											</> :
											null;
									}
									default:
									case ColumnType.text: {
										return columnValue.value;
									}
								}
							})()}
						</MTableCell>;
					})
				}
			</MaterialTableRow>
		);
	}
}
