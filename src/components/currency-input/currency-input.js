import React from "react";

import { CURRENCIES } from "../../utils";

const CurrencyInput = ({
  additionalClass = ``,
  title = `Выбор валюты`,
  value,
  currencyValue,
  onValueChange,
  onCurrencyChange,
  ratesValue,
  disabled = false,
}) => {
  return (
    <div className={`currency-input ${additionalClass}`}>
      <h2 className="currency-input__title">{title}</h2>
      <div className="currency-input__current-wrapper">
        <div className="currency-input__current-value">
          <select
            className={`currency-input__select`}
            onChange={(e) => onCurrencyChange(e.target.value)}
            defaultValue={currencyValue}
          >
            {CURRENCIES.map((item, index) => (
              <option
                className="currency-input__select-item"
                key={`currency-${index}`}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <label className="currency-input__label">
          <input
            className="currency-input__value"
            type="number"
            value={value || ``}
            onChange={(evt) => {
              onValueChange(+evt.target.value);
            }}
            placeholder="Введите значение"
            disabled={disabled}
          />
        </label>
        <div className="currency-input__rate">{ratesValue()}</div>
      </div>
    </div>
  );
};

export default CurrencyInput;
