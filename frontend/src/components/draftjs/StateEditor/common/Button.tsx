import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  format?: string;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, format, active, ...rest }) => {
  return (
    <button
      className={active ? 'btnActive' : ''}
      title={format}
      {...rest}
      style={{ width: '30px', height: '20px', margin: '0 2px' }}
    >
      {children}
    </button>
  );
};

export default Button;
