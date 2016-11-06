import { Link } from "react-router";

const propTypes = {
  goBack: React.PropTypes.func.isRequired,
  checkRoute: React.PropTypes.func.isRequired,
  toggleNav: React.PropTypes.func.isRequired,
  isNavShown: React.PropTypes.bool.isRequired,
  routePath: React.PropTypes.string
};

function Header (props) {
  const isFirstPage = !props.parentRoute;
  const links = [
    {route: "/app/form/training", name: "Создать тренировку"},
    {route: "/logout/", name: "Logout"}
  ];
  const leftAction = (isFirstPage)
    ? <div className="header__action header__action_nav" onClick={props.toggleNav} />
    : <div className="header__action header__action_prev-page" onClick={props.goBack} />;

  function renderLink (link, i) {
    let linkItem = link.route === "/logout/"
      ? <a href={link.route} className="header__nav-link">{link.name}</a>
      : <Link to={link.route} className="header__nav-link">{link.name}</Link>;
    return (
      <li key={i} className="header__list-item">
        { linkItem }
      </li>
    );
  }

  return (
    <div className="header">
      { leftAction }
      <div className="header__page-name">{props.routeName}</div>
      <div className={classNames("header__action", "header__action_menu", { hidden: isFirstPage })}/>
      <div className={classNames("header__nav", { header__nav_open: props.isNavShown })}>
        <ul className="header__list">
          { links.map(renderLink) }
        </ul>
      </div>
      <span className={classNames("header__mask", { header__mask_open: props.isNavShown })} />
    </div>
  );
}

Header.propTypes = propTypes;

export default Header;
