import { useRef, useState } from 'react';
import { sendLoyaltyCredit, sendLoyaltyDebit } from '../../../lib/transfer';
import { ILoyaltyTransfer } from '../../../types/loyalty-transfer';
import { validateTransaction } from '../../../utils/verify-transaction';
import Icon from '../../💎Atoms/Icon/Icon';

interface TransactionProps {
  className?: string;
  jwtToken?: string;
  betpointsBalance: number;
  contestsBalance: number;
}

const Transaction: React.FC<TransactionProps> = ({
  className,
  betpointsBalance,
  contestsBalance,
  jwtToken,
}) => {
  const [status, setStatus] = useState<'danger' | 'success' | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'credit' | 'debit'>('debit');

  const amountRef = useRef<HTMLInputElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const handleTransfer = async () => {
    const amount = amountRef.current?.value;

    const transactionValidaton = validateTransaction(
      amount,
      type,
      betpointsBalance,
      contestsBalance
    );

    if (!transactionValidaton.isValid) {
      setStatus('danger');
      setMessage(transactionValidaton.message);
      return;
    }

    setLoading(true);

    /**
     * Hanle 401 Unauthorized by sending request to refresh-token endpoint
     */
    let res;
    if (type === 'credit') {
      res = await sendLoyaltyCredit(+amount!, jwtToken);
    } else if (type === 'debit') {
      res = await sendLoyaltyDebit(+amount!, jwtToken);
    }

    if (isLoyalty(res)) {
      setStatus('success');
      setMessage('Transfer made');
    } else {
      setStatus('danger');
      const resString = res as string;
      const message =
        resString == 'Player not found'
          ? 'Please sign into Contests first before making your first transfer'
          : 'Unable to make transfer';
      setMessage(message);
    }

    setLoading(false);
  };

  const isLoyalty = (input: any): input is ILoyaltyTransfer =>
    input?.status !== undefined;

  const toggleType = () => {
    setStatus(null);
    setType((prev) => {
      if (prev === 'credit') {
        return 'debit';
      }
      return 'credit';
    });
  };

  return (
    <div id="transaction" className={`border border-1 ${className}`}>
      <div className="d-flex justify-content-center">
        <div className="text-center d-flex gap-1">
          <div className="bg-light p-3">
            Betpoints Wallet
            <p className="fs-3 mb-0">{betpointsBalance.toLocaleString()}</p>
          </div>
          <div className="bg-light p-3">
            Contests Balance
            <p className="fs-3 mb-0">{contestsBalance.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-auto m-2" style={{ minHeight: '1rem' }}>
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                {status && (
                  <div
                    className={`alert alert-${status} text-center my-1`}
                    role="alert"
                    ref={alertRef}
                  >
                    {message}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className="row align-items-center justify-content-center" role="group" aria-label="transfer form">

          <div className="col-12 col-lg-2">
            <label htmlFor="amount" className="text-uppercase">Amount</label>
            <input
              ref={amountRef}
              onChange={() => {
                setStatus(null);
              }}
              required
              type="text"
              id="amount"
              className="form-control"
            />
          </div>

          <div className="col-5 col-lg-2">
            <label htmlFor="from" className="text-uppercase">From</label>
            <input
              type="text"
              readOnly
              className="form-control border"
              id="from"
              value={type === 'credit' ? 'Contests' : 'Betpoints'}
            />
          </div>

          <div className="col-2 col-lg-auto text-center p-0">
            <button onClick={toggleType} className="btn btn-primary col-2 col-lg-auto mt-3 p-0 rounded-circle" style={{width: '40px', height:'40px'}}>
              <Icon icon={"mat-icon-swap-horiz icon-white"} text={"transfer button"} />
            </button>
          </div>
          
          <div className="col-5 col-lg-2">
            <label htmlFor="to" className="text-uppercase">To</label>
            <input
              type="text"
              readOnly
              className="form-control"
              id="to"
              value={type === 'credit' ? 'Betpoints' : 'Contests'}
            />
          </div>
          
          <div className="col-auto col-xl-2 mt-2">
            <button
              disabled={loading}
              onClick={handleTransfer}
              className="btn btn-primary"
            >
            Transfer Points
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Transaction;
