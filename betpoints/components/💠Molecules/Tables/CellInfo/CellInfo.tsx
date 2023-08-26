import Link from 'next/link';

export type ICellInfo = {
  description: string;
  url: string;
  times: string;
  transaction: string;
};

const CellInfo: React.FC<ICellInfo> = ({
  description,
  url,
  times,
  transaction,
}) => {
  return (
    <div>
      <span>{times}</span>
      <br />
      {description === 'Post Point' ? 
          <div className="content-section">
            <Link href={url} legacyBehavior>
              {transaction}
            </Link>
          </div>
        : <div>{transaction}</div>
      }
    </div>
  );
};

export default CellInfo;
