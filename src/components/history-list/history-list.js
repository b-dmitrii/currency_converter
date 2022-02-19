import React from "react";

import HistoryItem from "../history-item/history-item";

const HistoryList = ({ orders }) => (
  <ul className="history__list">
    {orders.map((order) => (
      <HistoryItem {...order} key={order.key} />
    ))}
  </ul>
);

export default HistoryList;
