import Stopwatch from "../../Components/StopwatchComponent/StopwatchComponent";

const propTypes = {
  rest: React.PropTypes.string.isRequired,
  repeats: React.PropTypes.string.isRequired
};

class StopwatchContainer extends React.Component {
  constructor() {
    super();
    this.interval;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.setRestTime = this.setRestTime.bind(this);
    this.state = {
      repeats: "",
      restMinutes: "",
      restSeconds: "",
      repeatsDone: 0,
      isComplete: false,
      isTimerWorking: false
    };
  }

  componentWillMount() {
    this.setState({
      rest: this.props.rest,
      repeats: +this.props.repeats
    });
    this.setRestTime();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setRestTime() {
    var timer = this.props.rest.split(":");
    this.setState({
      restMinutes: +timer[0],
      restSeconds: +timer[1]
    });
  }

  startTimer() {
    if (this.state.repeats === this.state.repeatsDone) {
      this.setState({
        isComplete: true
      });
      return;
    }
    this.setState({
      isTimerWorking: true
    });
    this.interval = setInterval(() => {
      let secondsRemaining = this.state.restSeconds;
      let minutesRemaining = this.state.restMinutes;

      if (minutesRemaining !== 0 || secondsRemaining !== 0){
        if (secondsRemaining === 0) {
          --minutesRemaining;
          secondsRemaining = 60;
        }
        this.setState({
          restMinutes: minutesRemaining,
          restSeconds: --secondsRemaining
        });
        if (minutesRemaining === 0 && secondsRemaining === 0) {
          this.handleTimerCompletion();
        }
      }
    }, 1000);
  }

  handleTimerCompletion() {
    this.setRestTime();
    this.setState({
      repeatsDone: ++this.state.repeatsDone,
      isTimerWorking: false
    });
    clearInterval(this.interval);
    document.getElementById("stop-timer").play();
  }

  stopTimer() {
    console.log(this.state);
  }

  showTimer() {
    let minutesRemaining = this.state.restMinutes;
    let secondsRemaining = this.state.restSeconds;
    if (minutesRemaining < 10) minutesRemaining = `0${minutesRemaining}`;
    if (secondsRemaining < 10) secondsRemaining = `0${secondsRemaining}`;
    const timer = `${minutesRemaining}:${secondsRemaining}`;
    return timer;
  }

  render() {
    return (
      <Stopwatch
        rest={this.showTimer()}
        repeatsDone={this.state.repeatsDone}
        startTimer={this.startTimer}
        stopTimer={this.stopTimer}
        isComplete={this.state.isComplete}
        isTimerWorking={this.state.isTimerWorking}
      />
    );
  }
}

StopwatchContainer.propTypes = propTypes;

export default StopwatchContainer;
