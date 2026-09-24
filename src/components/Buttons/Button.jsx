import React from 'react';

const Button = ({ type = 'button', onClick = () => {}, text = '', className = '', disabled = false}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`.trim()}
      disabled={disabled}
     >
      {text}
    </button>
  );
};

export default Button;