import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const CancelButton = withStyles({
    root: {
    },
    label: {
      textTransform: "capitalize",
      fontSize: "18px",
      fontWeight: "bold",
    },
  })(Button);

export default CancelButton;
