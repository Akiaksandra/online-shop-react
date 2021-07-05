import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  fieldset: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "#00BCD4",
    width: "200px",
    margin: "15px auto 0",
  },
  buttonWhite: {
    color: "#00BCD4",
    backgroundColor: "white",
    marginLeft: "15px",
  }
}));

export default useStyles;