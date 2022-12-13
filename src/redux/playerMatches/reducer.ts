import * as actionTypes from './actionTypes';
import { PlayerMatchesAction } from './actions';
import {
  Match,
  Player,
} from './models';
import { getSetsWonInMatchForPlayer } from '../../utils/tennisUtils';
import { sortByProperty } from '../../utils/arrayUtil';

export interface PlayerMatchesState {
  playersById: Record<string, Player>;
  matchesById: Record<string, Match>;
  playersBySetsWon: { playerId: string; totalSetsWon: number; }[];
}

const initialState: PlayerMatchesState = {
  playersById: {},
  matchesById: {},
  playersBySetsWon: [],
};

const getUpdatedPlayersBySetsWonForMatch = (
  playersBySetsWon: { playerId: string; totalSetsWon: number; }[],
  match: Match,
  playerOneSetsIncrement: number,
  playerTwoSetsIncrement: number
): { playerId: string; totalSetsWon: number; }[] => {
  const updatedPlayersBySetsWon = playersBySetsWon
    .map((playerSetsWon) => {
      if (playerSetsWon.playerId === match.playerOneId) {
        return ({
          ...playerSetsWon,
          totalSetsWon: playerSetsWon.totalSetsWon + playerOneSetsIncrement,
        });
      }

      if (playerSetsWon.playerId === match.playerTwoId) {
        return ({
          ...playerSetsWon,
          totalSetsWon: playerSetsWon.totalSetsWon + playerTwoSetsIncrement,
        });
      }

      return playerSetsWon;
    });

  return sortByProperty(updatedPlayersBySetsWon, 'totalSetsWon', false);
};

export default function(state = initialState, action: PlayerMatchesAction): PlayerMatchesState {
  switch (action.type) {
    case actionTypes.ADD_PLAYER:
      return {
        ...state,
        playersById: {
          ...state.playersById,
          [action.payload.id]: action.payload,
        },
        playersBySetsWon: [
          ...state.playersBySetsWon,
          {
            playerId: action.payload.id,
            totalSetsWon: 0,
          },
        ],
      };
    case actionTypes.REMOVE_PLAYER:
      const playerToRemoveId: string = action.payload;

      // Remove player
      const newPlayersById = { ...state.playersById };
      delete newPlayersById[playerToRemoveId];

      // Remove matches played by player
      const allMatches: Match[] = Object.values(state.matchesById);
      const matchesNotPlayedByPlayer: string[] = allMatches
        .filter((match) => match.playerOneId !== playerToRemoveId && match.playerTwoId !== playerToRemoveId)
        .map((match) => match.id);

      const matchesByIdToKeep = matchesNotPlayedByPlayer.reduce((acc, matchId) => ({
        ...acc,
        [matchId]: state.matchesById[matchId],
      }), {} as typeof state.matchesById);

      // Remove total sets won for player
      const newPlayersBySetsWon = state.playersBySetsWon
        .filter((playerSetsWon) => playerSetsWon.playerId !== playerToRemoveId);

      return {
        ...state,
        playersById: newPlayersById,
        matchesById: matchesByIdToKeep,
        playersBySetsWon: newPlayersBySetsWon,
      };
    case actionTypes.ADD_MATCH:
      const newMatch = action.payload;

      const playerOneSetsWon: number = getSetsWonInMatchForPlayer(newMatch.playerOneId, newMatch);
      const playerTwoSetsWon: number = getSetsWonInMatchForPlayer(newMatch.playerTwoId, newMatch);

      return {
        ...state,
        matchesById: {
          ...state.matchesById,
          [action.payload.id]: action.payload,
        },
        playersBySetsWon: getUpdatedPlayersBySetsWonForMatch(
          state.playersBySetsWon,
          newMatch,
          playerOneSetsWon,
          playerTwoSetsWon
        ),
      };
    case actionTypes.REMOVE_MATCH:
      const newMatchesById = { ...state.matchesById };
      const matchToRemove = newMatchesById[action.payload];

      const playerOneSetsCountToRemove: number = -getSetsWonInMatchForPlayer(matchToRemove.playerOneId, matchToRemove);
      const playerTwoSetsCountToRemove: number = -getSetsWonInMatchForPlayer(matchToRemove.playerTwoId, matchToRemove);

      delete newMatchesById[action.payload];

      return {
        ...state,
        matchesById: newMatchesById,
        playersBySetsWon: getUpdatedPlayersBySetsWonForMatch(
          state.playersBySetsWon,
          matchToRemove,
          playerOneSetsCountToRemove,
          playerTwoSetsCountToRemove
        ),
      };
    default:
      return state;
  }
}
