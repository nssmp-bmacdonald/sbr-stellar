import { IMenu } from '../../../types/layout/menu';

export interface IAvatar {
  text: string;
  src: string;
  className?: string;
  dClassName?: string;
  size: string;
  alt: string;
  icon: string;
}

export interface IUserAvatarLink extends IMenu {
  text?: string;
  href?: string;
  avatar: IAvatar;
  balance?: string;
  aClassName?: string;
}
