export interface Player {
  id: string;
  name: string;
}

export interface Match {
  id: string;
  playerOneId: string;
  playerTwoId: string;
  sets: Set[];
}

export interface Set {
  id: number;
  playerOnePoints: number;
  playerTwoPoints: number;
}
