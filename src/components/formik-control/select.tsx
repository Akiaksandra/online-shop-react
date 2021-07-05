import React from 'react';
import { ErrorMessage, Field, FieldAttributes } from 'formik';
import TextError from './text-error';
import { Select, MenuItem } from '@material-ui/core';
import useStyles from './use-styles'
import { ArrType } from '../../types/types';

const SelectList: React.FC<{label: string, name: string, options: ArrType, isMultiple: boolean}> = (props) => {
  const classes = useStyles();

  const {label, name, options, isMultiple, ...rest} = props;
  return (
    <div className="form-control">
    <div className="form-label">{label}</div> 
    <Field name={name} {...rest}>
        {
          ({ field, form }: FieldAttributes<any>) => { 
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