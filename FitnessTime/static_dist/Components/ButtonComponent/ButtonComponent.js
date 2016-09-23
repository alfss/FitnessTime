"use strict";

const propTypes = {
  name: React.PropTypes.string.isRequired,
  classes: React.PropTypes.string,
  type: React.PropTypes.string,
  action: React.PropTypes.func,
  isHidden: React.PropTypes.bool
};

function Button (props) {
  let classes = `button ${props.classes} ${(props.isHidden) ? "hidden" : ""}`;

  return (
    <button type={props.type} className={classes} onClick={props.action} disabled={props.isDisabled}>{props.name}</button>
  );
}

Button.propTypes = propTypes;

export default Button;
