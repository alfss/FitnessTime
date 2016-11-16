import Stopwatch from "../../Components/StopwatchComponent/StopwatchComponent";

class StopwatchContainer extends React.Component {
  constructor() {
    super();
    this.timerInterval;
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.finishTimer = this.finishTimer.bind(this);
    this.setRestTime = this.setRestTime.bind(this);
    this.state = {
      repeats: "",
      restMinutes: "",
      restSeconds: "",
      isComplete: false,
      isTimerWorking: false
    };
  }

  componentWillMount() {
    this.setState({ repeats: +this.props.repeats + 1 });
    this.setRestTime();
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRepeat === this.state.repeats) this.setState({ isComplete: true });
  }

  setRestTime() {
    const timer = this.formatRestTimer(this.props.rest).split(":");
    this.setState({
      restMinutes: +timer[0],
      restSeconds: +timer[1]
    });
  }

  startTimer() {
    this.setState({ isTimerWorking: true });
    this.timerInterval = setInterval(() => {
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
        if (minutesRemaining === 0 && secondsRemaining === 10) this.props.setShouldStartWarning(true);
        if (minutesRemaining === 0 && secondsRemaining === 0) this.finishTimer();
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.setRestTime();
    this.setState({
      isComplete: false,
      isTimerWorking: false
    });
    this.props.setRepeatsDone(1);
  }

  finishTimer() {
    clearInterval(this.timerInterval);
    this.props.setShouldStartWarning(false);
    this.props.setRepeatsDone();
    this.setRestTime();
    this.setState({ isTimerWorking: false });
    document.getElementById("stop-timer").play();
  }

  formatRestTimer(time) {
    let minutes = (time) ? parseInt(time / 60) : this.state.restMinutes;
    let seconds = (time) ? (time  - minutes * 60) : this.state.restSeconds;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  render() {
    return (
      <Stopwatch
        rest={this.formatRestTimer()}
        startTimer={this.startTimer}
        resetTimer={this.resetTimer}
        finishTimer={this.finishTimer}
        isComplete={this.state.isComplete}
        isTimerWorking={this.state.isTimerWorking}
      />
    );
  }
}

export default StopwatchContainer;
