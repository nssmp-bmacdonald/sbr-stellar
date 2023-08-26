import { IconInterface } from '../../../types/💎atoms/icon';

export const Icon = ({ text, icon, size, color }: IconInterface) => {
  return (
    <>
      {icon === '' ? (
        <>{text}</>
      ) : (
        <>
          <span
            className={`${icon === '' ? '' : icon}${
              size ? ' mat-icon-size-' + size : ''
            }${color ? ' icon-' + color : ''}`}
          ></span>
          <span className="visually-hidden">{text}</span>
        </>
      )}
    </>
  );
};
export default Icon;
