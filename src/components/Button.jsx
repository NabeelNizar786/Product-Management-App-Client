import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button className="customButton" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
