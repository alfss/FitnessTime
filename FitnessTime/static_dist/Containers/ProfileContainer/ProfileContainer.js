import Profile from "../../Components/ProfileComponent/ProfilComponent";

class ProfileContainer extends React.Component {
  componentWillMount() {
    this.props.getParentRoute("/app");
  }
  
  render() {
    return <Profile/>;
  }
}

export default ProfileContainer;
