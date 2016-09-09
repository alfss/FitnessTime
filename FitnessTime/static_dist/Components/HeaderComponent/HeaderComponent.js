import { Link } from "react-router";

const propTypes = {
  showNav: React.PropTypes.func.isRequired
};

function Header (props) {
  return (
    <div className="header">
      <button className="header__button" onClick={props.showNav}>
        <span className="header__button-line"></span>
      </button>
      <div className="header__nav hidden">
        <ul className="header__list">
          <li className="header__list-item">
            <Link to="/form/session"> Item 1 </Link>
          </li>
          <li className="header__list-item">Item 2</li>
          <li className="header__list-item">Item 3</li>
        </ul>
      </div>
      <div className="header__page-name">{props.routePathName}</div>
      <div className="header__account"></div>
    </div>
  );
}

Header.propTypes = propTypes;

export default Header;
