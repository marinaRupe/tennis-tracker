import * as actionTypes from './actionTypes';
import {
  Match,
  Player,
} from './models';

type AddPlayerAction = {
  type: typeof actionTypes.ADD_PLAYER;
  payload: Player;
};

export const addPlayer = (player: Player): AddPlayerAction => ({
  type: actionTypes.ADD_PLAYER,
  payload: player,
});

type RemovePlayerAction = {
  type: typeof actionTypes.REMOVE_PLAYER;
  payload: string;
};

export const removePlayer = (playerId: string): RemovePlayerAction => ({
  type: actionTypes.REMOVE_PLAYER,
  payload: playerId,
});

type SetPlayersPageAction = {
  type: typeof actionTypes.SET_PLAYERS_PAGE;
  payload: { pageNumber: number; };
};

export const setPlayersPage = (pageNumber: number): SetPlayersPageAction => ({
  type: actionTypes.SET_PLAYERS_PAGE,
  payload: { pageNumber },
});

type AddMatchAction = {
  type: typeof actionTypes.ADD_MATCH;
  payload: Match;
};

export const addMatch = (match: Match): AddMatchAction => ({
  type: actionTypes.ADD_MATCH,
  payload: match,
});

type RemoveMatchAction = {
  type: typeof actionTypes.REMOVE_MATCH;
  payload: string;
};

export const removeMatch = (matchId: string): RemoveMatchAction => ({
  type: actionTypes.REMOVE_MATCH,
  payload: matchId,
});

export type PlayerMatchesAction = AddPlayerAction
  | RemovePlayerAction
  | SetPlayersPageAction
  | AddMatchAction
  | RemoveMatchAction;
