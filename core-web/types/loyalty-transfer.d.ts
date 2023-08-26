export interface ILoyaltyTransfer {
  playerId: number;
  playerProviderId: string;
  totalPoints: number;
  status: string;
  numGamesPlayed: number;
  numWinningBets: number;
  numWinningBetLegs: number;
}
