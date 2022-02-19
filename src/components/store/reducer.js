import { combineReducers } from "redux";
import { reducer as ConverterReduser } from "./converter/converter";

const reducer = combineReducers({
  converter: ConverterReduser,
});

export default reducer;
