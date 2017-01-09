function Stopwatch ({
  rest,
  startTimer,
  finishTimer,
  resetTimer,
  isComplete,
  isTimerWorking
}) {
  const infoBlock = (isComplete)
    ? <div className="stopwatch__finish">Вы завершили все подходы. Если хотите, можете начать заново.</div>
    : <div className="stopwatch__rest-timer">Отдых: {rest}</div>;
  return (
    <div className="stopwatch">
      { infoBlock }
      <div className="stopwatch__controls">
        <button className={classNames("button", "button_start", {removed: isTimerWorking || isComplete} )} onClick={startTimer}>Начать отдых</button>
        <button className={classNames("button", "button_pause", {removed: !isTimerWorking} )} onClick={finishTimer}>Закончить отдых</button>
        <button className={classNames("button", "button_reset", {removed: !isComplete} )} onClick={resetTimer}>Начать заново</button>
      </div>
    </div>
  );
}

export default Stopwatch;
