import React from 'react';
import Input from './input';
import RadioButtons from './radio';
import SelectList from './select';
import Textarea from './textarea';
import File from './file'

const FormikControl: React.FC<any> = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case ("input"):
      return <Input {...rest}/>;
    case ("radio"):
      return <RadioButtons {...rest}/>;  
    case ("select"):
      return <SelectList {...rest}/>;  
    case ("textarea"): 
      return <Textarea {...rest}/>;
    case ("file"):
      return <File {...rest}/>  
    default: return null;  
  }
}

export default FormikControl;