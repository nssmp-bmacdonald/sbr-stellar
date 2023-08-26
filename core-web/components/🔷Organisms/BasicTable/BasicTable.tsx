import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import {
  DOTS,
  UsePagination,
} from '../../💠Molecules/Tables/Pagination/UsePagination';

interface ITableProps {
  rows: any;
  columns: any;
  className: string;
  pagination: boolean;
}

const BasicTable: React.FC<ITableProps> = ({
  rows,
  columns,
  className,
  pagination,
}) => {
  const [data] = useState(() => rows);
  // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
  const siblingCount = 2;
  const pageSize = 20;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const tIndex = !pagination ? 0 : table.getState().pagination.pageIndex + 1;
  const rangePage = UsePagination(rows.length, pageSize, siblingCount, tIndex);

  useEffect(() => {
    {
      !pagination
        ? table.setPageSize(Number(rows.length))
        : table.setPageSize(Number(pageSize));
    }
  }, [pagination, rows.length, tIndex, table]);

  return (
    <>
      <table className={className}>
        <thead
          className={`${className?.indexOf('table-bp') > 0 ? 'bg-dark' : ''}`}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      {pagination ? (
        <>
          {/* <span className="flex">
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span> */}
          <nav
            className="d-flex justify-content-center align-items-center"
            aria-label="History page navigation"
          >
            <ul className="pagination">
              <li
                className={`page-item ${
                  !table.getCanPreviousPage() ? 'disabled' : ''
                }`}
              >
                <button
                  className="btn btn btn-outline-secondary border rounded-circle p-0 page-link"
                  style={{ width: '40px', height: '40px' }}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Previous"
                >
                  <span
                    className="mat-icon-arrow-back mat-icon-size-24"
                    aria-hidden="true"
                  ></span>
                </button>
              </li>
              {rangePage?.map((pageNumber: any, id: number) =>
                pageNumber === DOTS ? (
                  <li
                    key={id}
                    className="pagination-item dots d-flex justify-content-center align-items-center"
                  >
                    <span className="text-dark py-1 px-2 d-none d-md-block d-lg-block d-xl-block">
                      &#8230;
                    </span>
                  </li>
                ) : (
                  <li
                    key={id}
                    className={`page-item d-flex justify-content-center align-items-center ${
                      table.getState().pagination.pageIndex + 1 == pageNumber
                        ? 'active'
                        : 'd-none d-md-block d-lg-block d-xl-block'
                    }`}
                    aria-current={
                      table.getState().pagination.pageIndex + 1 == pageNumber
                        ? true
                        : false
                    }
                  >
                    <button
                      className="page-link"
                      onClick={() => table.setPageIndex(pageNumber - 1)}
                      aria-label={`Go to page ${pageNumber}`}
                    >
                      {pageNumber}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  !table.getCanNextPage() ? 'disabled' : ''
                }`}
              >
                <button
                  className="btn btn btn-outline-secondary border rounded-circle p-0 page-link"
                  style={{ width: '40px', height: '40px' }}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Next"
                >
                  <span
                    className="mat-icon-arrow-forward mat-icon-size-24"
                    aria-hidden="true"
                  ></span>
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default BasicTable;
