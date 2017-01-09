function Pagination ({
  pages,
  currentPage,
  switchPage,
  previousPage,
  nextPage
}) {
  const pagesNumber = [...Array(+pages)].map((x, i) => {
    const page = i + 1;
    return (
      <li key={i}>
        <span onClick={switchPage(page)} className={classNames("pagination__page", {pagination__page_active: page === currentPage})}>{page}</span>
      </li>
    );
  });
  return (
    <ul className="pagination">
      <li><span className="pagination__page-nav" onClick={previousPage}>«</span></li>
      { pagesNumber }
      <li><span className="pagination__page-nav" onClick={nextPage}>»</span></li>
    </ul>
  );
}

export default Pagination;
