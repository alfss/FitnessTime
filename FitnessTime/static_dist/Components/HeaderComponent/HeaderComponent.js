import { Link } from "react-router";

const propTypes = {
  showNav: React.PropTypes.func.isRequired,
  goBack: React.PropTypes.func.isRequired
};

function Header (props) {
  return (
    <div className="header">
      <div className="header__previous-page" onClick={props.goBack}></div>
      <div className="header__nav hidden">
        <ul className="header__list">
          <li className="header__list-item">
            <Link to="/" className="header__nav-link"> Главная страница </Link>
          </li>
          <li className="header__list-item">
            <Link to="/form/session" className="header__nav-link"> Создать сессию </Link>
          </li>
        </ul>
      </div>
      <div className="header__page-name">{props.routePathName}</div>
      <div className="header__account" onClick={props.showNav}></div>
    </div>
  );
}

Header.propTypes = propTypes;

export default Header;
