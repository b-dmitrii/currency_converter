import axios from "axios";

import { CURRENCIES } from "../utils";

const BASE_URL = `https://api.currencyscoop.com/v1/historical/`;
const REQUEST_TIMEOUT = 5000;

const SYMBOLS_CURRENCYS = CURRENCIES.join(`,`);

const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": `application/json`,
    },
    params: {
      api_key: `33d4b28927996970d584db2279764e0a`,
      symbols: SYMBOLS_CURRENCYS,
    },
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
