const propTypes = {
  pages: React.PropTypes.number.isRequired,
  switchPage: React.PropTypes.func.isRequired,
  nextPage: React.PropTypes.func,
  previousPage: React.PropTypes.func,
  currentPage: React.PropTypes.number.isRequired
};

function Pagination (props) {
  const pages = [...Array(+props.pages)].map((x, i) => {
    const page = i + 1;
    const classes = (page === props.currentPage) ? "pagination__page pagination__page_active" : "pagination__page";
    return (
      <li key={i}>
        <a onClick={props.switchPage(page)} className={classes}>{page}</a>
      </li>
    );
  });
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
