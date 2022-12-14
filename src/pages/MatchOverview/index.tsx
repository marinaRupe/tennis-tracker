import React, {
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  connect,
  ConnectedProps,
} from 'react-redux';

import { RootState } from '../../redux/store';
import Match from '../../components/Matches/Match';
import {
  Match as MatchModel,
  Player,
} from '../../redux/playerMatches/models';

const mapStateToProps = ({ playerMatches }: RootState) => ({
  matchesById: playerMatches.matchesById,
  playersById: playerMatches.playersById,
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const MatchOverview: React.FC<Props> = React.memo<Props>(({
  matchesById,
  playersById,
}) => {
  const [
    match,
    setMatch,
  ] = useState<Nullable<MatchModel>>(null);
  const [
    playerOne,
    setPlayerOne,
  ] = useState<Nullable<Player>>(null);
  const [
    playerTwo,
    setPlayerTwo,
  ] = useState<Nullable<Player>>(null);

  const { matchId } = useParams();

  useEffect(() => {
    if (!matchesById || !matchId) return;

    const matchDetails = matchesById[matchId] ?? null;
    setMatch(matchDetails);
  }, [
    matchesById,
    matchId,
  ]);

  useEffect(() => {
    if (!match) return;

    const {
      playerOneId,
      playerTwoId,
    } = match;

    const playerOneDetails = playersById[playerOneId] ?? null;
    const playerTwoDetails = playersById[playerTwoId] ?? null;

    setPlayerOne(playerOneDetails);
    setPlayerTwo(playerTwoDetails);
  }, [
    match,
    playersById,
  ]);

  if (!match || !playerOne || !playerTwo) return null;

  return (
    <div className='match-overview'>
      <Match
        id={match.id}
        playerOne={playerOne}
        playerTwo={playerTwo}
        sets={match.sets}
      />
    </div>
  );
});

export default connector(MatchOverview);
