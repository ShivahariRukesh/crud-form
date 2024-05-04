import { useState } from "react";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page
  const items = Array.from({ length: 50 }, (v, i) => i + 1); // Sample array of items

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <ul>
        {currentItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (v, i) => i + 1).map(
          (pageNumber) => (
            <button key={pageNumber} onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Table;
