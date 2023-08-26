import { IButton } from '../../../types/💎atoms/button';
import Icon from '../Icon/Icon';
/**
 * Primary UI component for user interaction
 */
const mapBtn = new Map();
mapBtn.set('Primary Button', 'btn btn-primary');
mapBtn.set('Dark Button', 'btn btn-secondary');
mapBtn.set('Ghost Button', 'btn btn-outline-secondary');
mapBtn.set('Grey Ghost Button', 'btn btn-light');
mapBtn.set('Button With Icon', 'btn btn-light');

const mapBtnSize = new Map();
mapBtn.set('none', '48');
mapBtn.set('sm', '40');
mapBtn.set('lg', '54');

export const Button = ({
  clasName,
  type,
  size = 'none',
  label,
  icons,
  position = 'left',
  circle = false,
  ...props
}: IButton) => {
  const buttonType = mapBtn.get(type);
  const buttonSize = mapBtnSize.get(size);

  return (
    <button
      type="button"
      style={
        circle && (icons?.icon !== null || icons?.icon !== undefined)
          ? { width: buttonSize, height: buttonSize, padding: 0 }
          : {}
      }
      className={[
        `${size !== 'none' ? 'btn-' + size : ''}`,
        `${circle && icons?.icon ? 'rounded-circle' : ''}`,
        buttonType,
        `${clasName ? clasName : ''}`,
      ].join(' ')}
      {...props}
    >
      {icons && icons?.icon && position == 'left' ? (
        <Icon
          icon={icons?.icon}
          text={icons?.text}
          size={icons?.size}
          color={
            buttonType.indexOf('primary') > 0 ||
            buttonType.indexOf('secondary') > 0
              ? icons?.color
              : null
          }
        />
      ) : (
        ''
      )}
      {circle && icons?.icon ? '' : label}
      {icons && icons?.icon && position == 'right' ? (
        <Icon icon={icons?.icon} text={icons?.text} size={icons?.size} />
      ) : (
        ''
      )}
    </button>
  );
};

export default Button;
