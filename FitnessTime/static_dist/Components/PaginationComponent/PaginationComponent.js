function Pagination (props) {
  const pages = [...Array(+props.pages)].map((x, i) => <li><a key={i} className="pagination__page" href="#">{i + 1}</a></li>);
  return (
    <ul className="pagination">
      <li><a className="pagination__page-nav" href="#">«</a></li>
      {pages}
      <li><a className="pagination__page-nav" href="#">»</a></li>
    </ul>
  );
}

export default Pagination;
