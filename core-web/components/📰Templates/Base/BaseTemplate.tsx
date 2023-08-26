export interface IBaseTemplate {
  content: any;
  className?: string;
  rowClassName?: string;
  cntClassName?: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({
  content,
  className,
  rowClassName,
  cntClassName,
}) => {
  return (
    <div className={className ? className : ''}>
      <div className={rowClassName ? rowClassName : ''}>
        {cntClassName ? (
          <div className={cntClassName ? cntClassName : ''}>{content}</div>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default BaseTemplate;
