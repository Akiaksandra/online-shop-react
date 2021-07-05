import React from 'react';
import { TextField } from '@material-ui/core';
import { ErrorMessage, FastField, FieldAttributes } from 'formik';
import TextError from './text-error';
import './formik-styles.scss';
import useStyles from './use-styles';

const Input: React.FC<{label: string, name: string, inputType: string, inputClassName?: string, formControlClassName?: string}> = (props) => {

  const classes = useStyles();
  
  const {label, name, inputType, inputClassName = classes.input, formControlClassName = "form-control"} = props;
  return (
    <div className={formControlClassName} key={name}>
      <FastField name={name}>
        {({field}: FieldAttributes<any>) => (
        <TextField
                name={name}
                label={label}
                variant="outlined"
                className={inputClassName}
                size="small"
                type={inputType}
                {...field}
        />)}  
      </FastField>    
      <ErrorMessage name={name} component={TextError}/>
    </div>
  )
}

export default Input;