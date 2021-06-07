import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './text-error';
import { Select, MenuItem } from '@material-ui/core';
import useStyles from './use-styles'

const SelectList = (props) => {
  const classes = useStyles();

  const {label, name, options, isMultiple, ...rest} = props;
  return (
    <div className="form-control">
    <div className="form-label">{label}</div> 
    <Field name={name} {...rest}>
        {
          ({ field, form }) => { 
            return (
              <Select
                  {...field}
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple = {isMultiple}
                  value = {field.value}
                  className = {classes.select}
                >
                  {options.map(({value, label}) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              )
          }
      }
      </Field>  
        <ErrorMessage name={name} component={TextError}/>
      </div>    
  )
};

export default SelectList;