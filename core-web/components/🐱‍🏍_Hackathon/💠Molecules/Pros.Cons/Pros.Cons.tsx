import parse from 'html-react-parser';
import Icon from '../../../💎Atoms/Icon/Icon';

export interface IProsCons {
  className?: string;
  pcData: any;
  type: true | false;
  theme?: 'list' | 'card';
  max: number;
}

export const ProsCons = ({
  className,
  pcData,
  type = false,
  theme = 'list',
  max,
}: IProsCons) => {
  return (
    <div className={className}>
      <h5 className="mb-2 d-flex">
        <Icon
          text={`${type ? 'Thumbs Up' : 'Thumbs Down'}`}
          size="20"
          color={`${type ? 'green' : 'red'}`}
          icon={`${
            type
              ? 'me-2 mat-icon-thumb-up-alt  icon-green'
              : 'me-2 mat-icon-thumb-down-alt icon-red'
          }`}
        />
        <span></span> {type ? 'Pros' : 'Cons'}
      </h5>
      {theme === 'list' ? (
        <ul className={`sportsbook-${type ? 'pros' : 'cons'}`}>
          {type
            ? pcData.pros
                .slice(0, max)
                .map((pros: any, proID: number) => (
                  <li key={proID}>{parse(pros) as string}</li>
                ))
            : pcData.cons
                .slice(0, max)
                .map((cons: any, consID: number) => (
                  <li key={consID}>{parse(cons) as string}</li>
                ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProsCons;
