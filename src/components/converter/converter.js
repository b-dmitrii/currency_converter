import React from "react";

import { Statuses } from "../../utils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CurrencyInput from "../currency-input/currency-input";
import Calendar from "../calendar/calendar";
import Button from "../button/button";
import History from "../history/history";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../store/converter/converter";
import { toFixedTwo } from "../store/converter/converter";

const Converter = () => {
  const { have, want, date, history, rates, loaded } = useSelector(
    (state) => state.converter
  );
  const isLoadedCorrectly = loaded === Statuses.LOADED;
  const isErrored = loaded === Statuses.ERROR;
  const dispatch = useDispatch();

  const rate = (currency) => {
    if (currency === have.currency) {
      return (
        <p>{`1 ${have.currency} = ${toFixedTwo(
          rates[want.currency] / rates[have.currency]
        )}${want.currency}`}</p>
      );
    }
    if (currency === want.currency) {
      return (
        <p>{`1 ${want.currency} = ${toFixedTwo(rates[have.currency])}${
          have.currency
        }`}</p>
      );
    }
  };
  return (
    <section className="converter">
      <div className="container">
        <h2 className="converter__title">Конвертер валют</h2>
        {isErrored ? (
          <span className="converter__error-message">
            При получении данных произошла ошибка Попробуйте обновить страницу
          </span>
        ) : (
          ``
        )}
        <form className="converter__form" action="#" method="get">
          <CurrencyInput
            additionalClass="converter__currency-input"
            title="У меня есть"
            currencyValue={have.currency}
            ratesValue={() => rate(have.currency)}
            value={have.value}
            onValueChange={(e) => dispatch(ActionCreator.setHaveValue(e))}
            onCurrencyChange={(e) => dispatch(ActionCreator.setHaveCurrency(e))}
            disabled={!isLoadedCorrectly}
          />
          <div className="converter__arrow-wrapper">
            <ArrowForwardIcon style={{ fontSize: "40px" }} />
            <ArrowBackIcon style={{ fontSize: "40px" }} />
          </div>
          <CurrencyInput
            additionalClass="converter__currency-input"
            title="Хочу приобрести"
            value={want.value}
            onValueChange={(e) => dispatch(ActionCreator.setWantValue(e))}
            currencyValue={want.currency}
            ratesValue={() => rate(want.currency)}
            onCurrencyChange={(e) => dispatch(ActionCreator.setWantCurrency(e))}
            disabled={!isLoadedCorrectly}
          />
          <Calendar
            date={date}
            onDateChange={(date) => dispatch(ActionCreator.setDate(date))}
            disabled={!isLoadedCorrectly}
          />

          <Button
            additionalClass="converter__button"
            onClick={() => dispatch(ActionCreator.addOrder())}
            disabled={!isLoadedCorrectly}
          >
            Сохранить результат
          </Button>
        </form>
        <History
          history={history}
          onClearButtonClick={() => dispatch(ActionCreator.clearHistory())}
        />
      </div>
    </section>
  );
};

export default Converter;
