
import {
    useTable,
    useSortBy,
    usePagination,
    useGlobalFilter,
} from '@tanstack/react-table';

const TanstackTable = ({ data, columns }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { globalFilter, pageIndex, pageSize },
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <div>
            <div>
                <input
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </div>
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header')}
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageCount}
                    </strong>{' '}
                </span>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 15].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};


export default TanstackTable;
;
