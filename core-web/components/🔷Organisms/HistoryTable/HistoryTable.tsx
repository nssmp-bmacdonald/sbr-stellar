import { createColumnHelper } from '@tanstack/react-table';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toLocaleFullDate } from '../../../helpers/date-helpers';
import { getClientPointHistory } from '../../../lib/points';
import { PointTransaction } from '../../../types/layout/tables/table-history';
import { IPoint } from '../../../types/point';
import BasicTable from '../BasicTable/BasicTable';
interface ITableHistoryProps {
  userAPI: string;
}

const colHelper = createColumnHelper<PointTransaction>();

export const Columns = [
  colHelper.accessor('timestamp', {
    id: 'date',
    header: () => 'Date',
    cell: (info) => <div className="timestamp">{toLocaleFullDate(info.getValue())}</div>,
  }),
  colHelper.accessor('toFrom', {
    id: 'toFrom',
    header: () => 'To/From',
    cell: (info) => info.getValue(),
  }),
  colHelper.accessor('transaction', {
    id: 'transaction',
    header: () => 'Transaction',
    cell: (info) => info.getValue(),
  }),
  colHelper.accessor('balance', {
    id: 'balance',
    header: () => parse('<div className="text-end">Points') as string,
    cell: (info) =>
      parse(
        `${
          info.getValue()
            ? '<div className="text-end ' + info.getValue()[0] + '">' + info.getValue()[1] + '</div><div className="text-end">' + info.getValue()[2] + '</div>'
            : ''
        }`
      ) as string,
  }),
];

const HistoryTable: React.FC<ITableHistoryProps> = ({ userAPI }) => {
  const [_history, setHistory] = useState<PointTransaction[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getHistoryData(userAPI).then((response) => {
      const _data: PointTransaction[] = response.map((row: IPoint) => {
        let withdraw = row.withdrawAccount ? (
          <Link href={`${row.withdrawAccount.slug}/`} legacyBehavior>
            <a>{row.withdrawAccount.userName}</a>
          </Link>
        ) : (
          'SBR'
        );
        let val: PointTransaction = {
          timestamp: row.timestamp,
          toFrom:
            row.type === 'Withdrawl' ? (
              row.depositAccount ? (
                <Link href={`${row.depositAccount.slug}/`} legacyBehavior>
                  <a>{row.depositAccount.userName}</a>
                </Link>
              ) : (
                'SBR'
              )
            ) : (
            <div style={{wordBreak: 'break-all'}}>{withdraw}</div>
          ),
          transaction: row.postUrl ? (
            <div className="content-section">
              <Link href={`${row.postUrl}`} legacyBehavior>
                <a>
                  {row.transaction}
                </a>
              </Link>
            </div>
          ) : (
            row.transaction + (row.status === 'Pending' ? ' (Pending)' : '')
          ),
          balance: [
            row.type === 'Deposit' ? 'text-success' : 'text-sbrRed',
            row.type === 'Deposit'
              ? '+' +
                row.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '-' +
                row.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            row.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          ],
        };
        return val;
      });
      setHistory(_data);
      setLoading(false);
    });
  }, [userAPI]);

  if (isLoading)
    return (
      <>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    );

  return (
    <>
      {_history && _history?.length > 0 ? (
        <BasicTable
          className={`table table-borderless align-middle table-bp mt-0`}
          rows={_history}
          columns={Columns}
          pagination={true}
        />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-12 my-7 text-center">
              <p>No history available</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryTable;

const getHistoryData = async (user: string): Promise<IPoint[]> => {
  const pointsHistory = await getClientPointHistory(user);
  return pointsHistory;
};
