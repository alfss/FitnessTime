function Pagination (props) {
  return (
    <ul className="pagination">
      <li><a className="pagination__page-nav" href="#">«</a></li>
      <li><a className="pagination__page pagination__page_active" href="#">1</a></li>
      <li><a className="pagination__page" href="#">2</a></li>
      <li><a className="pagination__page" href="#">3</a></li>
      <li><a className="pagination__page" href="#">4</a></li>
      <li><a className="pagination__page" href="#">5</a></li>
      <li><a className="pagination__page" href="#">6</a></li>
      <li><a className="pagination__page" href="#">7</a></li>
      <li><a className="pagination__page-nav" href="#">»</a></li>
    </ul>
  );
}

export default Pagination;
