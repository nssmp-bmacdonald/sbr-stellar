import { IconInterface } from './icon';
export interface IButton {
  clasName?: string;
  type:
    | 'Primary Button'
    | 'Dark Button'
    | 'Ghost Button'
    | 'Grey Ghost Button'
    | 'Button With Icon';
  size?: 'none' | 'sm' | 'lg';
  label?: string;
  icons?: IconInterface;
  position?: 'left' | 'right';
  circle?: boolean;
  onClick?: () => void;
}
