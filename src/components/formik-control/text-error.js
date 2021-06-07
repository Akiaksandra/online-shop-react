import React from 'react';


const TextError = (props) => {
  return (
    <div className="form-error">
      {props.children}
    </div>
  )
}

export default TextError;