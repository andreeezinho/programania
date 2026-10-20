import React from 'react';
import LoadingButton from '../Loaders/LoadingButton';

const Button = ({ type = 'button', onClick = () => {}, text = '', className = '', icon = null, disabled = false , loading = false}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn disabled:cursor-not-allowed ${className} ${loading ? 'bg-[#e55a50]' : null}`.trim()}
      disabled={disabled || loading}
     >
      {!loading ? icon : null}
      {!loading ? text : null}
      {loading && (
        <LoadingButton />
      )}
    </button>
  );
};

export default Button;