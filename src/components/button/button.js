import React from "react";

const Button = ({
  children = ``,
  additionalClass = ``,
  onClick = () => {},
  disabled = false,
}) => (
  <button
    className={`button ${additionalClass}`}
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {children}
  </button>
);

export default React.memo(Button);
