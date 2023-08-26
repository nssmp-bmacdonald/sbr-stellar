import Image from 'next/image';
import { IAvatar } from '../../../types/layout/avatar';
import Icon from '../Icon/Icon';

const ISize: any = {
  xs: 24,
  sm: 36,
  md: 48,
  lg: 56,
  xl: 64,
  xxl: 80,
};

const Avatar: React.FC<IAvatar> = ({
  text,
  src,
  className,
  dClassName,
  size,
  alt,
  icon,
}) => {
  return (
    <div
      className={dClassName}
      style={{ width: ISize[size], height: ISize[size] }}
    >
      {src === '' ? (
        <Icon icon={`${icon === '' ? 'mat-icon-person' : icon} `} text={text} />
      ) : (
        <Image
          src={src}
          alt={alt === '' ? text : alt}
          width={ISize[size]}
          height={ISize[size]}
          className={className}
          unoptimized
        />
      )}
    </div>
  );
};

export default Avatar;
