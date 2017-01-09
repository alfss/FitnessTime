function Menu ({
  children,
  toggleMenu,
  isMenuOpen,
  menuClass, triggerClass,
  wrapperClass
}) {
  return (
    <div className={classNames({[menuClass]: menuClass})}>
      <button className={classNames("menu__trigger", {[triggerClass]: triggerClass})} onClick={toggleMenu}/>
      <div className={classNames("menu__wrapper", {[wrapperClass]: wrapperClass, "removed": !isMenuOpen})}>
        {children}
      </div>
    </div>
  );
}

export default Menu;
