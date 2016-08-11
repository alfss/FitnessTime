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
  const showFinishBlock = props.isComplete ? {display: ""} : {display: "none"};
  return (
    <div className="stopwatch">
      <div className="stopwatch__repeat-count">Повтор: {props.repeatsDone}</div>
      <div className="stopwatch__rest-timer">Отдых: {props.rest}</div>
      <div className="stopwatch__finish" style={showFinishBlock}>Вы уже сделали все повторы.</div>
      <div className="stopwatch__controls">
        <Button
          classes="stopwatch__button stopwatch__button_start"
          name="Start"
          action={props.startTimer}
          isDisabled={props.isTimerWorking}
        />
        <Button
          classes="stopwatch__button stopwatch__button_pause"
          name="Pause"
        />
        <Button
          classes="stopwatch__button stopwatch__button_stop"
          name="Stop"
        />
      </div>
    </div>
  );
}

Stopwatch.propTypes = propTypes;

export default Stopwatch;
