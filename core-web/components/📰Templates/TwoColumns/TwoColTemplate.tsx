export interface I2ColTemplate {
  content: string; // | '3/9' | '4/8' | '5/4' | '5/7' | '6/6' | '7/5' | '8/4' | '9/3' | '0/0'
  header?: string;
  col1?: any;
  col2?: any;
  footer?: any;
  image?: string;
  className?: string;
  rowClassName?: string;
  c1ClassName?: string;
  c2ClassName?: string;
}

const TwoColTemplate: React.FC<I2ColTemplate> = ({
  content,
  header,
  col1,
  col2,
  footer,
  image,
  className,
  rowClassName,
  c1ClassName,
  c2ClassName,
}) => {
  return (
    <div
      className={className ? className : ''}
      style={{ backgroundImage: image }}
    >
      <div className={rowClassName ? rowClassName : ''}>
        {header ? <div className="col-12">{header}</div> : ''}
        {col1 ? (
          <div
            className={`col-12 col-md-6 ${
              c1ClassName ? c1ClassName : ''
            } col-lg-${content.split('/')[0]}`}
          >
            {col1}
          </div>
        ) : (
          ''
        )}
        {col2 ? (
          <div
            className={`col-12 col-md-6 ${
              c2ClassName ? c2ClassName : ''
            } col-lg-${content.split('/')[1]}`}
          >
            {col2}
          </div>
        ) : (
          ''
        )}
        {footer ? (
          <div
            className={`col-12 col-lg-${
              parseInt(content.split('/')[0]) + parseInt(content.split('/')[1])
            }`}
          >
            {footer}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default TwoColTemplate;
