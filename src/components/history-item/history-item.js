import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const DATE_OPTIONS = {
  day: `numeric`,
  month: `numeric`,
  year: `numeric`,
};

const HistoryItem = ({ date, have, want }) => {
  const dateObj = new Date(date);

  return (
    <li className="history__item">
      <time className="history__date" dateTime={dateObj.toISOString()}>
        {dateObj.toLocaleString(`ru-RU`, DATE_OPTIONS)}
      </time>
      <span className="history__from">
        <span>{have.value}</span> {have.currency}
      </span>
      <ArrowForwardIcon style={{ marginRight: "55px" }} />
      <span className="history__to">
        <span>{want.value}</span> {want.currency}
      </span>
    </li>
  );
};

export default React.memo(HistoryItem);
