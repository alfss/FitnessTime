const propTypes = {
  pages: React.PropTypes.number.isRequired,
  switchPage: React.PropTypes.func.isRequired,
  nextPage: React.PropTypes.func,
  previousPage: React.PropTypes.func
};

function Pagination (props) {
  const pages = [...Array(+props.pages)].map((x, i) => <li key={i}><a onClick={props.switchPage(i + 1)} className="pagination__page">{i + 1}</a></li>);
  return (
    <ul className="pagination">
      <li><a className="pagination__page-nav" onClick={props.previousPage}>«</a></li>
      { pages }
      <li><a className="pagination__page-nav" onClick={props.nextPage}>»</a></li>
    </ul>
  );
}

Pagination.propTypes = propTypes;

export default Pagination;
