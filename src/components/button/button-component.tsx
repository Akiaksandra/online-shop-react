import React from "react";
import { Button } from '@material-ui/core';

type ButtonProps = {
  text: any,
  variant?: "contained" | "text" | "outlined",
  color?: "primary" | "secondary",
  className?: string,
  onClick?: any,
  type?: "submit" | "reset",
  disabled?: boolean,
  key?: string | number | undefined,
  value?: string | number | undefined,
  startIcon?: any,
  style?: any,
};

const ButtonComponent: React.FC<ButtonProps> = (props) => {

  const { text, variant = "contained", color = "primary", className, onClick, type, disabled, key, value, startIcon, style } = props;

  return (
    <Button variant={variant} color={color} className={className} onClick={onClick} type={type} disabled={disabled} key={key} value={value} startIcon={startIcon} style={style}>
        {text}
      </Button>
  )
}

export default ButtonComponent;