import NotFoundPageComponent from "../../Components/NotFound404Component/NotFound404Container";

class NotFoundPage extends React.Component {

  componentWillUpdate(nextProps) {
    if (this.props.routeParams.page !== nextProps.routeParams.page) this.props.checkIsPageExist(true);
  }

  render() {
    return <NotFoundPageComponent />;
  }
}

export default NotFoundPage;
