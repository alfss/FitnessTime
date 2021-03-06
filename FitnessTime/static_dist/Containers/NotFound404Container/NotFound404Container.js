import NotFoundPageComponent from "../../Components/NotFound404Component/NotFound404Container";

class NotFoundPage extends React.Component {

  componentWillUpdate(nextProps) {
    for (let key in this.props.routeParams) {
      if (this.props.routeParams[key] !== nextProps.routeParams[key]) this.props.renderNotFoundPage(false);
    }
  }

  componentWillMount() {
    document.title = "404: Not Found";
    this.props.setFetchingData(false);
  }

  render() {
    return <NotFoundPageComponent />;
  }
}

export default NotFoundPage;
