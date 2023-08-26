import parse from 'html-react-parser';

export interface IReadMoreTemplate {
  cntVisible?: any;
  cntHidden?: any;
  className?: string;
  btnclassName?: string;
  rmId?: string;
}

const ReadMoreTemplate: React.FC<IReadMoreTemplate> = ({
  cntVisible,
  cntHidden,
  className,
  btnclassName,
  rmId,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="read-toggle-visibility content-section">
            {parse(cntVisible) as string}
            {cntHidden ? (
              <button
                className={`${btnclassName}`}
                type="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls={`#${rmId}`}
              >
                Read More
              </button>
            ) : (
              ''
            )}
            {cntHidden ? (
              <div id={rmId} className="collapse">
                {parse(cntHidden) as string}
                <button
                  className={`${btnclassName} mb-1`}
                  type="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls={`#${rmId}`}
                >
                  Read Less
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadMoreTemplate;
