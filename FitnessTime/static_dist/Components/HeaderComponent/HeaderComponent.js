import { Link } from "react-router";
import Menu from "../../Containers/MenuContainer/MenuContainer";

function Header ({parentRoute, toggleNav, goBack, routeName, isNavShown} = this.props) {
  const isFirstPage = !parentRoute;
  const links = [
    {route: "/app/form/training", name: "Создать тренировку"},
    {route: "/logout/", name: "Logout"}
  ];
  const leftAction = (isFirstPage)
    ? <div className="header__action header__action_nav" onClick={toggleNav} />
    : <div className="header__action header__action_prev-page" onClick={goBack} />;

  function renderLink (link, i) {
    let linkItem = (link.route === "/logout/")
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
      <div className="header__page-name">{routeName}</div>
      <Menu menuClass={classNames("header__action", "menu_header", {hidden: isFirstPage})} triggerClass="menu__trigger_header" wrapperClass="menu__wrapper_header">
        <div className="menu__item">Изменить порядок</div>
      </Menu>
      <div className={classNames({"removed": !isFirstPage})}>
        <div className={classNames("header__nav", { header__nav_open: isNavShown })}>
          <ul className="header__list">
            { links.map(renderLink) }
          </ul>
        </div>
        <span className={classNames("header__mask", { header__mask_open: isNavShown })} />
      </div>
    </div>
  );
}

export default Header;
