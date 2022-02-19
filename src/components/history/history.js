import React from "react";

import Button from "../button/button";
import HistoryList from "../history-list/history-list";

const History = ({ history, onClearButtonClick }) => {
  const isEmpty = history.length === 0;

  return (
    <div className={`history ${isEmpty ? `history--empty` : ``}`}>
      <h3 className="history__title">История конвертаций</h3>
      {isEmpty ? (
        <h4 className="history__empty-message">
          Похоже в истории конвертаций нет ни одной записи
        </h4>
      ) : (
        <HistoryList orders={history} />
      )}
      <Button
        additionalClass="history__button"
        onClick={onClearButtonClick}
        disabled={isEmpty}
      >
        Очистить историю
      </Button>
    </div>
  );
};

export default History;
