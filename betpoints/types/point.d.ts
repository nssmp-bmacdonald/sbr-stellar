import { IUser } from '../user';

export interface IPoint {
  id: number;
  type: string;
  status: string;
  amount: number;
  description: string;
  transaction: string;
  postUrl: string | undefined;
  balance: number;
  timestamp: Date;
  depositAccount: IUser;
  withdrawAccount: IUser;
}
