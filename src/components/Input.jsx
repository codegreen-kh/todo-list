import React from 'react';

function Input({ type, name, placeholder, required }) {
  return (
    <div className="mdc-textfield">
      <input
        type={type}
        name={name}
        className="mdc-text-field__input"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Input;