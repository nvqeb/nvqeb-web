import * as React from "react";
import "./style.scss";

// Mobx
import { observer } from "mobx-react";

// Material-UI
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import strings from "../../../resources/strings";

interface IProps {
	header: string[];
	hasEdit: boolean;
	hasDelete: boolean;
}

@observer
export default class PostsTable extends React.Component<IProps> {
	public render() {
		const { header, hasEdit, hasDelete } = this.props;

		return (
			<TableHead>
				<TableRow>
					{
						hasEdit && hasDelete ?
							<TableCell
								key={"header_cell_editAndDelete"}
								align="center"
								padding="dense"
							>
								{strings.components.table.editAndDelete}
							</TableCell> :
							hasEdit ?
								<TableCell
									key={"header_cell_edit"}
									align="center"
									padding="dense"
								>
									{strings.components.table.edit}
								</TableCell> :
								hasDelete ?
									<TableCell
										key={"header_cell_delete"}
										align="center"
										padding="dense"
									>
										{strings.components.table.delete}
									</TableCell> : <></>
					}
					{
						header.map((headerItem, index) =>
							<TableCell
								key={"header_cell_" + index}
								align="center"
								padding="dense"
							>
								{headerItem}
							</TableCell>,
						)
					}
				</TableRow>
			</TableHead>
		);
	}
}
