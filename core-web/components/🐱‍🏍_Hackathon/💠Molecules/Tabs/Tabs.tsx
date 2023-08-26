export interface ITabs {
  className?: string;
  pcData: any;
  type: true | false;
  theme?: 'list' | 'card';
}

export const Tabs = ({
  className,
  pcData,
  type = false,
  theme = 'list',
}: ITabs) => {};

export default Tabs;
