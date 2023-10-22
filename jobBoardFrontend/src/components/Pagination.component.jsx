const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
            <ul className="pagination flex gap-2">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button
                            className={`page-link ${currentPage === number ? 'bg-blue-500 py-2 px-4 rounded-lg text-white' : 'bg-white p-2 rounded-lg text-blue-500 hover:bg-blue-500 py-2 px-4 hover:text-white'}`}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;