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
      rest: "",
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
    clearInterval(this.timerInterval);
  }

  setRestTime() {
    const timer = this.props.rest.split(":");
    this.setState({
      restMinutes: +timer[0],
      restSeconds: +timer[1]
    });
  }

  startTimer() {
    if (this.state.repeats === this.state.repeatsDone) {
      this.setState({ isComplete: true });
      return;
    }
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
        if (minutesRemaining === 0 && secondsRemaining === 0) {
          this.props.setShouldStartWarning(false);
          this.handleTimerCompletion();
        }
      }
    }, 1000);
  }

  handleTimerCompletion() {
    clearInterval(this.timerInterval);
    this.setRestTime();
    this.setState({
      repeatsDone: ++this.state.repeatsDone,
      isTimerWorking: false
    });
    document.getElementById("stop-timer").play();
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.setRestTime();
    this.setState({
      repeatsDone: 0,
      isComplete: false,
      isTimerWorking: false
    });
  }

  finishTimer() {
    clearInterval(this.timerInterval);
    this.props.setShouldStartWarning(false);
    this.setRestTime();
    this.setState({
      repeatsDone: ++this.state.repeatsDone,
      isTimerWorking: false
    });
  }

  formatTime() {
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
        rest={this.formatTime()}
        repeatsDone={this.state.repeatsDone}
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
