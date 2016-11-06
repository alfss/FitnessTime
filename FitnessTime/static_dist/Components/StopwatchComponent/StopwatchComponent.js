"use strict";

function Stopwatch ({rest, repeatsDone, startTimer, finishTimer, resetTimer, isComplete, isTimerWorking} = this.props) {
  const showFinishBlock = isComplete ? {display: ""} : {display: "none"};
  const buttons = [
    {name: "Начать отдых", class: "button_start", action: startTimer, isRemoved: isTimerWorking || isComplete},
    {name: "Закончить отдых", class: "button_pause", action: finishTimer, isRemoved: !isTimerWorking},
    {name: "Сбросить", class: "button_reset", action: resetTimer, isRemoved: !isComplete}
  ];

  function renderButtons(button, i) {
    return <button key={i} className={classNames("button", button.class, {removed: button.isRemoved} )} onClick={button.action}>{button.name}</button>;
  }
  return (
    <div className="stopwatch">
      <div className="stopwatch__info">
        <div className="stopwatch__repeat-count">Повтор: {repeatsDone}</div>
        <div className="stopwatch__rest-timer">Отдых: {rest}</div>
      </div>
      <div className="stopwatch__finish" style={showFinishBlock}>Вы уже сделали все повторы.</div>
      <div className="stopwatch__controls">
        { buttons.map(renderButtons) }
      </div>
    </div>
  );
}

export default Stopwatch;
