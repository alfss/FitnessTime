import Menu from "../../Containers/MenuContainer/MenuContainer";

function Header ({
  parentRoute,
  toggleNav,
  goBack,
  routeName,
  isNavShown,
  setAppState,
  routeParams,
  isPageExist
}) {
  const isFirstPage = !parentRoute;
  const leftAction = (isFirstPage)
    ? <div className="header__action header__action_nav" onClick={toggleNav} />
    : <div className="header__action header__action_prev-page" onClick={goBack} />;

  return (
    <div className="header">
      { leftAction }
      <div className="header__page-name">{routeName}</div>
      <Menu menuClass={classNames("header__action", "menu_header", {hidden: !routeParams.id || !isPageExist})}
            triggerClass="menu__trigger_header"
            wrapperClass="menu__wrapper_header"
      >
        <div className="menu__item" onClick={setAppState("editing")}>Изменить порядок</div>
      </Menu>
      <div className={classNames({"removed": !isFirstPage})}>
        <div className={classNames("header__nav", { header__nav_open: isNavShown })}>
          <div className="header__user">
            <img src="https://sap-certification.info/img/default-avatar.jpg"
                 className="header__user-img"
                 width="40"
                 height="40"
            />
            <span className="header__username">Zizik</span>
          </div>
          <ul className="header__list">
            <li className="header__list-item">
              <a href="#" className="header__nav-link">
                <i className="header__nav-icon header__nav-icon_setup" />
                <span className="header__nav-name">Настройки</span>
              </a>
            </li>
            <li className="header__list-item">
              <a href="/logout/" className="header__nav-link">
                <i className="header__nav-icon header__nav-icon_exit" />
                <span className="header__nav-name">Выйти</span>
              </a>
            </li>
          </ul>
        </div>
        <span className={classNames("header__mask", { header__mask_open: isNavShown })} />
      </div>
    </div>
  );
}

export default Header;
