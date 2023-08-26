import { createColumnHelper } from '@tanstack/react-table';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toLocaleFullDate } from '../../../helpers/date-helpers';
import { getClientPointHistory } from '../../../lib/points';
import { TransferTransaction } from '../../../types/layout/tables/table-transfer';
import { IPoint } from '../../../types/point';
import BasicTable from '../BasicTable/BasicTable';
interface ITableTransactionProps {
  userAPI: string;
}

const mapIcons = new Map();
mapIcons.set(
  'Sportsbook Deposit',
  'mat-icon-publish scale-y mat-icon-size-24 me-1'
);
mapIcons.set('Sportsbook Withdraw', 'mat-icon-publish mat-icon-size-24 me-1');

const colHelper = createColumnHelper<TransferTransaction>();

export const Columns = [
  colHelper.accessor('timestamp', {
    id: 'date',
    header: () => 'Date',
    cell: (info) => <div className="timestamp">{toLocaleFullDate(info.getValue())}</div>,
  }),
  colHelper.accessor('transaction', {
    id: 'transaction',
    header: () => 'Transaction',
    cell: (info) => info.getValue(),
  }),
  colHelper.accessor('points', {
    id: 'points',
    header: () => parse('<div className="text-end">Points') as string,
    cell: (info) => parse(
          `${
            info.getValue()
              ? '<div className="text-end">' + info.getValue() + '</div>'
              : ''
          }`
        ) as string,
  })
];

const TransferTable: React.FC<ITableTransactionProps> = ({ userAPI }) => {
  const [_history, setHistory] = useState<TransferTransaction[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    getHistoryData(userAPI).then((response) => {
      if (!response) {
        setError('Unable to get transaction history');
        setLoading(false);
        return;
      }

      let _data: TransferTransaction[] = response.map((row: IPoint) => {
        let val: TransferTransaction = {
          timestamp: row.timestamp,
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
          points: (
            row.type === 'Deposit' ? row.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
            row.type === 'Withdrawl' ? row.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
            null
          )
        };
        return val;
      });
      setHistory(_data);
      setLoading(false);
    });
  }, [userAPI]);

  if (isLoading)
    return (
      <div className="row">
        <div className="col my-7 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );

  if (!isLoading && error)
    return (
      <div className="row">
        <div className="col my-7 text-center">{error}</div>
      </div>
    );

  return (
    <>
      {_history && _history?.length > 0 ? (
        <div className="container">
          <div className="row">
            <h2 className="text-center">Past Transfers</h2>
            <div className="col-lg-10 offset-lg-1 table-responsive mb-7">
              <BasicTable
                className={`table table-borderless align-middle table-bp`}
                rows={_history}
                columns={Columns}
                pagination={false}
              />
              <div className="text-center">
                <Link href={`/points/history/${userAPI}/`} legacyBehavior>
                  <button className="btn btn-primary">View all Betpoints History</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No history available</p>
      )}
    </>
  );
};

export default TransferTable;

const getHistoryData = async (user: string): Promise<IPoint[] | null> => {
  let pointsHistory = await getClientPointHistory(user);
  if (!pointsHistory) return null;

  pointsHistory = pointsHistory.filter(
    (row) =>
      row.description === 'Sportsbook Withdraw' ||
      row.description === 'Sportsbook Deposit'
  );
  return pointsHistory.slice(0, 10);
};
