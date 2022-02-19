import { nanoid } from "@reduxjs/toolkit";
import { Statuses } from "../../../utils";
import { CURRENCIES } from "../../../utils";

export const toFixedTwo = (number) => +(Math.round(number + `e+2`) + `e-2`);

const initialState = {
  rates: {
    RUB: 0,
    USD: 0,
    EUR: 0,
    GBP: 0,
  },
  have: {
    currency: CURRENCIES[0],
    value: "",
  },
  want: {
    currency: CURRENCIES[1],
    value: "",
  },
  date: Date.now(),
  history: [],
  loaded: Statuses.PENDING,
};

export const ActionType = {
  SET_LOADED: `converter/setLoaded`,
  SET_HAVE_CURRENCY: `converter/setFromCurrency`,
  SET_HAVE_VALUE: `converter/setFromValue`,
  SET_WANT_CURRENCY: `converter/setWantCurrency`,
  SET_WANT_VALUE: `converter/setWantValue`,
  SET_DATE: `converter/setDate`,
  SET_RATES: `converter/setRates`,
  ADD_ORDER: `converter/addOrder`,
  CLEAR_HISTORY: `converter/clearHistory`,
};

export const ActionCreator = {
  setLoaded: (loaded) => ({
    type: ActionType.SET_LOADED,
    payload: loaded,
  }),

  setHaveCurrency: (currency) => ({
    type: ActionType.SET_HAVE_CURRENCY,
    payload: currency,
  }),

  setHaveValue: (value) => ({
    type: ActionType.SET_HAVE_VALUE,
    payload: value,
  }),

  setWantCurrency: (currency) => ({
    type: ActionType.SET_WANT_CURRENCY,
    payload: currency,
  }),

  setWantValue: (value) => ({
    type: ActionType.SET_WANT_VALUE,
    payload: value,
  }),

  setDate: (date) => ({
    type: ActionType.SET_DATE,
    payload: date,
  }),

  addOrder: () => ({
    type: ActionType.ADD_ORDER,
    payload: nanoid(),
  }),

  clearHistory: () => ({
    type: ActionType.CLEAR_HISTORY,
    payload: true,
  }),

  setRates: (rates) => ({
    type: ActionType.SET_RATES,
    payload: rates,
  }),
};

export const Operation = {
  loadRates: (date) => (dispatch, getState, api) => {
    const dateObj = new Date(date);

    dispatch(ActionCreator.setLoaded(Statuses.LOAD));

    return api
      .get(`/`, {
        params: {
          date: dateObj.toISOString().slice(0, 10),
        },
      })
      .then(({ data }) => {
        dispatch(ActionCreator.setDate(dateObj.getTime()));
        dispatch(ActionCreator.setRates(data.response.rates));
        dispatch(ActionCreator.setHaveValue(initialState.have.value));
        dispatch(ActionCreator.setLoaded(Statuses.LOADED));
      })
      .catch(() => {
        dispatch(ActionCreator.setLoaded(Statuses.ERROR));
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_LOADED:
      return {
        ...state,
        loaded: action.payload,
      };

    case ActionType.SET_HAVE_CURRENCY:
      const newWantValue =
        (state.have.value / state.rates[action.payload]) *
        state.rates[state.want.currency];
      return {
        ...state,
        ...(state.have.currency = action.payload),
        ...(state.want.value = toFixedTwo(newWantValue)),
      };

    case ActionType.SET_HAVE_VALUE:
      const newWantValue1 =
        (action.payload / state.rates[state.have.currency]) *
        state.rates[state.want.currency];
      return {
        ...state,
        ...(state.have.value = toFixedTwo(action.payload)),
        ...(state.want.value = toFixedTwo(newWantValue1)),
      };

    case ActionType.SET_WANT_CURRENCY:
      const newWantValue2 =
        (state.have.value / state.rates[state.have.currency]) *
        state.rates[action.payload];
      return {
        ...state,
        ...(state.want.currency = action.payload),
        ...(state.want.value = toFixedTwo(newWantValue2)),
      };

    case ActionType.SET_WANT_VALUE:
      const newHaveValue3 =
        (action.payload / state.rates[state.want.currency]) *
        state.rates[state.have.currency];
      return {
        ...state,
        ...(state.want.value = toFixedTwo(action.payload)),
        ...(state.have.value = toFixedTwo(newHaveValue3)),
      };

    case ActionType.SET_DATE:
      return {
        ...state,
        date: action.payload,
      };

    case ActionType.ADD_ORDER:
      const order = {
        date: state.date,
        have: { ...state.have },
        want: { ...state.want },
        key: action.payload,
      };
      const newHistory = [...state.history, order];
      return {
        ...state,
        history: newHistory.slice(0, 10),
      };

    case ActionType.CLEAR_HISTORY:
      return {
        ...state,
        history: [],
      };

    case ActionType.SET_RATES:
      for (const rate in action.payload) {
        if (action.payload.hasOwnProperty(rate)) {
          state.rates[rate] = action.payload[rate];
          return {
            ...state,
            rates: action.payload,
          };
        }
      }
      break;

    default:
      return state;
  }
};
