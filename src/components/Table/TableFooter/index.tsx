import * as React from "react";
import "./style.scss";

// Mobx
import { observer } from "mobx-react";

// Material-UI Components
import MButton from "@material-ui/core/Button";
import MTypography from "@material-ui/core/Typography";

// Material-UI Icons
import MIconButton from "@material-ui/core/IconButton";
import MChevronLeft from "@material-ui/icons/ChevronLeft";
import MChevronRight from "@material-ui/icons/ChevronRight";
import MAddIcon from "@material-ui/icons/Add";
import strings from "../../../resources/strings";

interface IProps {
	pageOffset: number;
	onNextClick?: () => void;
	onPrevClick?: () => void;
	onAddClick?: () => void;
	numberOfColumns: number;
}

@observer
export default class TableFooter extends React.Component<IProps> {
	public render() {
		const { pageOffset, onNextClick, onPrevClick, onAddClick } = this.props;

		return (
			<div className="footerDiv">
				{onAddClick ?
					<MButton
						style={{ marginLeft: 12 }}
						onClick={onAddClick}
						variant="contained"
					>
						<MAddIcon />
						{strings.components.table.create}
					</MButton> : <div/>
				}
				<div className="paginationControl">
					<MIconButton onClick={onPrevClick}>
						<MChevronLeft />
					</MIconButton>
					<MTypography variant="subtitle2">{pageOffset}</MTypography>
					<MIconButton onClick={onNextClick}>
						<MChevronRight />
					</MIconButton>
				</div>
			</div>
		);
	}
}
