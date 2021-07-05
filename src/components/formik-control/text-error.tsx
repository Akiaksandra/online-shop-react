import React from 'react';

const TextError: React.FC<any> = (props) => {
  return (
    <div className="form-error">
      {props.children}
    </div>
  )
}

export default TextError;