"use strict";

const propTypes = {
  name: React.PropTypes.string.isRequired,
  classes: React.PropTypes.string,
  type: React.PropTypes.string,
  action: React.PropTypes.func,
  isHidden: React.PropTypes.bool
};

function Button (props) {
  return (
    <button type={props.type} className={classNames("button", props.classes, {removed: props.isHidden} )} onClick={props.action} disabled={props.isDisabled}>{props.name}</button>
  );
}

Button.propTypes = propTypes;

export default Button;
