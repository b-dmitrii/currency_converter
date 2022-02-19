import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Main from "../main/main";
import { Operation } from "../store/converter/converter";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Operation.loadRates(Date.now()));
  }, [dispatch]);
  return (
    <div className="page">
      <Main />
    </div>
  );
};

export default App;
