import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './text-error';
import { Radio } from '@material-ui/core';

const RadioButtons = (props) => {
  const {label, name, options, ...rest} = props;
  return (
    <div className="form-control">
    <div className="form-label">{label}</div> 
    <Field name={name} {...rest}>
        {
        ({ field }) => {
         
          return options.map(option => {
            return (
              <React.Fragment key={option.label}>
                <Radio color="primary" {...field} value={option.value} checked={field.value === option.value} id={option.value} /> 
                <label htmlFor={option.value}>{option.label}</label>
              </React.Fragment>
            )}  
            )
          
        }
      }
      </Field>  
        <ErrorMessage name={name} component={TextError}/>
      </div>    
  )
};

export default RadioButtons;