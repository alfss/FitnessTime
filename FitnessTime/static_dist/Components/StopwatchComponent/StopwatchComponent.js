"use strict";

import Button from "../ButtonComponent/ButtonComponent";

function Stopwatch ({isComplete, repeatsDone, rest, startTimer, isTimerWorking, finishTimer, resetTimer} = this.props) {
  const showFinishBlock = isComplete ? {display: ""} : {display: "none"};
  return (
    <div className="stopwatch">
      <div className="stopwatch__info">
        <div className="stopwatch__repeat-count">Повтор: {repeatsDone}</div>
        <div className="stopwatch__rest-timer">Отдых: {rest}</div>
      </div>
      <div className="stopwatch__finish" style={showFinishBlock}>Вы уже сделали все повторы.</div>
      <div className="stopwatch__controls">
        <Button
          classes="stopwatch__button stopwatch__button_start"
          name="Начать отдых"
          action={startTimer}
          isHidden={isTimerWorking || isComplete}
        />
        <Button
          classes="stopwatch__button stopwatch__button_pause"
          name="Закончить отдых"
          action={finishTimer}
          isHidden={!isTimerWorking}
        />
        <Button
          classes="stopwatch__button stopwatch__button_reset"
          name="Сбросить"
          action={resetTimer}
          isHidden={!isComplete}
        />
      </div>
    </div>
  );
}

export default Stopwatch;
