import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: "auto"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '300px',
    width: '100%',
    overflowY: "auto",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    display: "block",
    width: "200px",
    margin: "15px auto 0",
  },
  dialog: {
    margin: "0 auto",
    flex: "none",
    padding: "0",
  }
}));

export default  useStyles;