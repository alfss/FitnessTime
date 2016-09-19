import { Link } from "react-router";

const propTypes = {
  showNav: React.PropTypes.func.isRequired,
  goBack: React.PropTypes.func.isRequired,
  checkRoute: React.PropTypes.func.isRequired,
  routePath: React.PropTypes.string
};

function Header (props) {
  const links = [
    {route: "/app", name: "Главная страница"},
    {route: "/app/form/session", name: "Создать тренировку "}
  ];
  const showGoBackBtn = (!props.parentRoute) ? {visibility:"hidden"} : null;

  return (
    <div className="header">
      <div className="header__previous-page" style={showGoBackBtn} onClick={props.goBack} />
      <div className="header__nav hidden">
        <ul className="header__list">
          {
            links.map( (item,i) => {
              return (
                <li key={i} className="header__list-item">
                  <Link to={item.route} className={props.checkRoute(item.route, true) ? "header__nav-link_disabled" : "header__nav-link"}> {item.name} </Link>
                </li>
              );
            })
          }
          <li className="header__list-item">
            <a href="/logout/" className="header__nav-link">Logout</a>
          </li>
        </ul>
      </div>
      <div className="header__page-name">{props.routeName}</div>
      <div className="header__account" onClick={props.showNav}></div>
    </div>
  );
}

Header.propTypes = propTypes;

export default Header;
