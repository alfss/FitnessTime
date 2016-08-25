function Pagination (props) {
  const pages = [...Array(+props.pages)].map((x, i) => <li><a key={i} onClick={props.switchPage(i + 1)} className="pagination__page">{i + 1}</a></li>);
  return (
    <ul className="pagination">
      <li><a className="pagination__page-nav">«</a></li>
      { pages }
      <li><a className="pagination__page-nav" onClick={props.nextPage}>»</a></li>
    </ul>
  );
}

export default Pagination;
