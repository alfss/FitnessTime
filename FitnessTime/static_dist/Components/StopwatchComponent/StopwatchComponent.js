"use strict";

import Button from "../ButtonComponent/ButtonComponent";

const propTypes = {
  rest: React.PropTypes.string.isRequired,
  repeatsDone: React.PropTypes.number.isRequired,
  startTimer: React.PropTypes.func.isRequired,
  isComplete: React.PropTypes.bool.isRequired,
  isTimerWorking: React.PropTypes.bool.isRequired
};

function Stopwatch (props) {
  console.log(props.isComplete);
  const showFinishBlock = props.isComplete ? {display: ""} : {display: "none"};
  return (
    <div className="stopwatch">
      <div className="stopwatch__info">
        <div className="stopwatch__repeat-count">Повтор: {props.repeatsDone}</div>
        <div className="stopwatch__rest-timer">Отдых: {props.rest}</div>
      </div>
      <div className="stopwatch__finish" style={showFinishBlock}>Вы уже сделали все повторы.</div>
      <div className="stopwatch__controls">
        <Button
          classes="stopwatch__button stopwatch__button_start"
          name="Начать отдых"
          action={props.startTimer}
          isHidden={props.isTimerWorking || props.isComplete}
        />
        <Button
          classes="stopwatch__button stopwatch__button_pause"
          name="Закончить отдых"
          action={props.finishTimer}
          isHidden={!props.isTimerWorking}
        />
        <Button
          classes="stopwatch__button stopwatch__button_reset"
          name="Сбросить"
          action={props.resetTimer}
          isHidden={!props.isComplete}
        />
      </div>
    </div>
  );
}

Stopwatch.propTypes = propTypes;

export default Stopwatch;
