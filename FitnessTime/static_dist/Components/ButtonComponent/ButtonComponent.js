"use strict";

const propTypes = {
  name: React.PropTypes.string.isRequired,
  classes: React.PropTypes.string,
  type: React.PropTypes.string,
  action: React.PropTypes.func,
  isDisabled: React.PropTypes.bool
};

function Button (props) {
  const classes = `button ${props.classes}`;
  return (
    <button type={props.type} className={classes} onClick={props.action} disabled={props.isDisabled}>{props.name}</button>
  );
}

Button.propTypes = propTypes;

export default Button;
