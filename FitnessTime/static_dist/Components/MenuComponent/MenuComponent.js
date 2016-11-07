function Menu ({children, toggleMenu, isMenuOpen} = this.props) {
  return (
    <div>
      <button className="menu__trigger" onClick={toggleMenu}/>
      <div className={classNames("menu__wrapper", {"removed": !isMenuOpen})}>
        {children}
      </div>
    </div>
  );
}

export default Menu;
