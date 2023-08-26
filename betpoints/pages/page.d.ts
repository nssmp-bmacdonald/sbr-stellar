import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';
import { IRegion } from '../types/region';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement, region: IRegion) => ReactNode;
  layout?: ComponentType;
};
