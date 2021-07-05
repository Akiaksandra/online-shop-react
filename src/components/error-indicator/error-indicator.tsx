import React from 'react';

import './error-indicator.scss';
import icon from './death-star.png';
import { Error } from '../../types/store-types';

const ErrorIndicator: React.FC<{ errorText:Error }> = ({ errorText }) => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error icon"/>
      <span className="boom">BOOM!</span>
      <span>
        {errorText}
      </span>
    </div>
  );
};

export default ErrorIndicator;
