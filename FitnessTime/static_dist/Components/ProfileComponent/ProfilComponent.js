function ProfileComponent() {
  return (
    <div className="profile">
      <div className="profile__info-block">
          <img src="https://sap-certification.info/img/default-avatar.jpg"
               className="profile__user-img"
               width="60"
               height="60"
          />
          <div className="profile__user-info">
            <div className="profile__username">Zizik</div>
            <div className="profile__user-mail">Zizik@mail</div>
          </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
