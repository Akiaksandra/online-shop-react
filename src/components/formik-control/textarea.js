import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './text-error';
import { TextareaAutosize } from '@material-ui/core';
import './formik-styles.scss'

const Textarea = (props) => {
  const {label, name, ...rest} = props;
  return (
    <div className="form-control">
    <div className="form-label">{label}</div> 
    <Field name={name} {...rest}>
        {
          ({ field }) => { 
            return (
              <TextareaAutosize rowsMin={3} rowsMax={12} {...field} className="form-textarea"/>
              )
          }
      }
      </Field>  
        <ErrorMessage name={name} component={TextError}/>
      </div>    
  )
}

export default Textarea;