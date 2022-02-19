import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DAYS_RANGE = 7;

const Calendar = ({ date, onDateChange, disabled = false }) => {
  const maxDate = new Date();
  const minDate = new Date().setDate(maxDate.getDate() - DAYS_RANGE);

  return (
    <div className="calendar">
      <DatePicker
        wrapperClassName={`calendar__input`}
        selected={new Date(date)}
        onChange={onDateChange}
        dateFormat="dd.MM.yyyy"
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
      />
      <CalendarTodayIcon
        style={{
          position: "absolute",
          top: "95px",
          right: "20px",
          fontSize: "40px",
          color: "blue",
          zIndex: "-1",
        }}
      />
    </div>
  );
};

export default Calendar;
