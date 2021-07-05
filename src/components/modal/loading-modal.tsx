import React from 'react';
import useStyles from './use-styles';

const LoadingModal: React.FC<{text: string}> = ({ text }) => {
  const classes = useStyles();
  return (
  <div className={classes.paper}>
    <h2 className ="transition-modal-title">{text}</h2>
  </div>
  )
}

export default LoadingModal;