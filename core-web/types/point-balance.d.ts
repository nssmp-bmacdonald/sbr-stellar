import { IUser } from '../user';

export interface IPointBalance {
  account: IUser;
  pending: number;
  earned: number;
  spent: number;
  won: number;
  lost: number;
  total: number;
  pendingRake: number;
}
