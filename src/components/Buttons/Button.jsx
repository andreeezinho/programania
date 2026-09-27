import React from 'react';

const Button = ({ type = 'button', onClick = () => {}, text = '', className = '', icon = null, disabled = false}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`.trim()}
      disabled={disabled}
     >
      {icon}
      {text}
    </button>
  );
};

export default Button;