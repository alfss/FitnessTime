import NotFoundPageComponent from "../../Components/NotFound404Component/NotFound404Container";

class NotFoundPage extends React.Component {

  componentWillUpdate(nextProps) {
    for (let key in this.props.routeParams) {
      if (this.props.routeParams[key] !== nextProps.routeParams[key]) this.props.checkIsPageExist(true);
    }
  }

  render() {
    return <NotFoundPageComponent />;
  }
}

export default NotFoundPage;
