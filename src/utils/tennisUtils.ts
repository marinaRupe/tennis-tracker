import {
  Match,
  Set,
} from '../redux/playerMatches/models';
import { minimumSetsToWinGame } from '../constants/values';

export const getSetsWonInMatchForPlayer = (playerId: string, match: Match): number => {
  const playerKey = match.playerOneId === playerId ? 'playerOne' : 'playerTwo';
  const opponentKey = match.playerOneId === playerId ? 'playerTwo' : 'playerOne';

  return match.sets.reduce((setsWonAcc, set) => (setsWonAcc + ((set[`${playerKey}Points`] > set[`${opponentKey}Points`]) ? 1 : 0)), 0);
};

export const getMatchWinner = (playerOneId: string, playerTwoId: string, sets: Set[]): string => {
  let playerOneSetsWon = 0;
  let playerTwoSetsWon = 0;

  if (sets.length < minimumSetsToWinGame) {
    throw Error(`Minimum of ${minimumSetsToWinGame} sets required`);
  }

  for (const set of sets) {
    if (set.playerOnePoints > set.playerTwoPoints) {
      playerOneSetsWon++;
    } else {
      playerTwoSetsWon++;
    }
  }

  return (playerOneSetsWon > playerTwoSetsWon) ? playerOneId : playerTwoId;
};
