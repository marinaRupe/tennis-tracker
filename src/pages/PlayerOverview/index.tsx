import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  connect,
  ConnectedProps,
} from 'react-redux';

import { RootState } from '../../redux/store';
import { Player as PlayerModel } from '../../redux/playerMatches/models';
import * as playerMatchesActions from '../../redux/playerMatches/actions';
import Matches from '../../components/Matches';
import PlayerInfo from '../../components/Players/PlayerInfo';
import { matchOverview } from '../../constants/clientRoutes';

const mapStateToProps = ({ playerMatches }: RootState) => ({
  playersById: playerMatches.playersById,
  playersBySetsWon: playerMatches.playersBySetsWon,
  matchesById: playerMatches.matchesById,
});

const mapDispatchToProps = {
  removeMatch: playerMatchesActions.removeMatch,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const PlayerOverview: React.FC<Props> = React.memo<Props>(({
  playersById,
  playersBySetsWon,
  matchesById,
  removeMatch,
}) => {
  const [
    player,
    setPlayer,
  ] = useState<Nullable<PlayerModel>>(null);
  const [
    totalSetsWon,
    setTotalSetsWon,
  ] = useState<number>(0);
  const [
    playerMatchIds,
    setPlayerMatchIds,
  ] = useState<string[]>([]);

  const { playerId } = useParams();

  useEffect(() => {
    if (!playersById || !playerId) return;

    const playerDetails = playersById[playerId] ?? null;
    const playerTotalSetsWon = (
      playersBySetsWon.find((playerSetsWon) => playerSetsWon.playerId === playerId)
    )?.totalSetsWon ?? 0;

    setPlayer(playerDetails);
    setTotalSetsWon(playerTotalSetsWon);
  }, [
    playersById,
    playersBySetsWon,
    playerId,
  ]);

  useEffect(() => {
    if (!matchesById || !playerId) return;

    const matchIds: string[] = [];
    for (const match of Object.values(matchesById)) {
      if (match.playerOneId !== playerId && match.playerTwoId !== playerId) continue;
      matchIds.push(match.id);
    }

    setPlayerMatchIds(matchIds);
  }, [
    matchesById,
    playerId,
  ]);

  const handleRemoveMatch = useCallback((matchId: string) => {
    removeMatch(matchId);
  }, [removeMatch]);

  const handleClickOnMatch = useCallback((matchId: string) => {
    window.open(matchOverview(matchId), '_blank');
  }, []);

  if (!player) return null;

  return (
    <div className='player-overview'>
      <PlayerInfo
        id={player.id}
        name={player.name}
        totalSetsWon={totalSetsWon}
      />
      <Matches
        matchIds={playerMatchIds}
        onRemoveMatch={handleRemoveMatch}
        onClickOnMatch={handleClickOnMatch}
      />
    </div>
  );
});

export default connector(PlayerOverview);
