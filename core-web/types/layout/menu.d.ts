export interface IMenu {
  text?: string;
  href: string;
  className?: string;
  aaTracker?: string;
  target?: string;
  rel?: string;
  icon: string;
  action?: MouseEventHandler<HTMLAnchorElement>;
}
[];

export interface INav {
  className?: string;
  menu: IMenu[];
}

export interface IDropdownMenu extends INav {
  text?: string;
  icon?: string;
  itemId?: string;
  ddClasses: string;
  aClassName: string;
}
[];
