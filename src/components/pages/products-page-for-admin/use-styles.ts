import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: "1200px",
    margin: "0 auto",
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: "750px",
  },
  button: {
    margin: "10px"
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  lastColumn: {
    width: "100px",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  }
}));

export default useStyles;