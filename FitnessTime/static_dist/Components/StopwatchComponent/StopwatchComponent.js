function Stopwatch ({
  rest,
  repeatsDone,
  startTimer,
  finishTimer,
  resetTimer,
  isComplete,
  isTimerWorking
}) {
  return (
    <div className="stopwatch">
      <div className="stopwatch__info">
        <div className="stopwatch__repeat-count">Повтор: {repeatsDone}</div>
        <div className="stopwatch__rest-timer">Отдых: {rest}</div>
      </div>
      <div className={classNames("stopwatch__finish", {"removed": !isComplete})}>Вы уже сделали все повторы.</div>
      <div className="stopwatch__controls">
        <button className={classNames("button", "button_start", {removed: isTimerWorking || isComplete} )} onClick={startTimer}>Начать отдых</button>
        <button className={classNames("button", "button_pause", {removed: !isTimerWorking} )} onClick={finishTimer}>Закончить отдых</button>
        <button className={classNames("button", "button_reset", {removed: !isComplete} )} onClick={resetTimer}>Сбросить</button>
      </div>
    </div>
  );
}

export default Stopwatch;
