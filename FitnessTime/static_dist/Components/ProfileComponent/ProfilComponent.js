import {Link} from "react-router";

function ProfileComponent({user}) {
  return (
    <div className="profile">
      <div className="profile__info-block">
          <img src="https://sap-certification.info/img/default-avatar.jpg"
               className="profile__user-img"
               width="60"
               height="60"
          />
          <div className="profile__user-info">
            <div className="profile__username">{user.username}</div>
            <div className="profile__user-mail">{user.email}</div>
          </div>
      </div>
      <Link to="/app/form/personal" className="profile__action">Сменить персональные данные</Link>
      <Link to="/app/form/password" className="profile__action">Сменить пароль</Link>
    </div>
  );
}

export default ProfileComponent;
