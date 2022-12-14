import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  connect,
  ConnectedProps,
} from 'react-redux';

import { RootState } from '../../redux/store';
import * as playerMatchesActions from '../../redux/playerMatches/actions';
import Button from '../../components/Buttons/Button';
import AddPlayerModal from './Modals/AddPlayerModal';
import {
  matchesList,
  playerOverview,
} from '../../constants/clientRoutes';
import PlayerInfo from '../../components/Players/PlayerInfo';
import Link from '../../components/Navigation/Link';
import { Player } from '../../redux/playerMatches/models';
import RemovePlayerModal from './Modals/RemovePlayerModal';
import Pagination from '../../components/Pagination';

const mapStateToProps = ({ playerMatches }: RootState) => ({
  playersById: playerMatches.playersById,
  playersBySetsWon: playerMatches.playersBySetsWon,
  playersPageNumber: playerMatches.playersPage.pageNumber,
  playersPageSize: playerMatches.playersPage.pageSize,
});

const mapDispatchToProps = {
  addPlayer: playerMatchesActions.addPlayer,
  removePlayer: playerMatchesActions.removePlayer,
  setPlayersPage: playerMatchesActions.setPlayersPage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const PlayersList: React.FC<Props> = React.memo<Props>(({
  playersById,
  playersBySetsWon,
  addPlayer,
  removePlayer,
  playersPageNumber,
  playersPageSize,
  setPlayersPage,
}) => {
  const [
    addPlayerModalIsOpen,
    setAddPlayerModalIsOpen,
  ] = useState<boolean>(false);
  const [
    removePlayerModalIsOpen,
    setRemovePlayerModalIsOpen,
  ] = useState<boolean>(false);
  const [
    selectedPlayer,
    setSelectedPlayer,
  ] = useState<Nullable<Player>>(null);

  useEffect(() => {
    setPlayersPage(0);
  }, [setPlayersPage]);

  const openAddPlayerModal = useCallback(() => {
    setAddPlayerModalIsOpen(true);
  }, []);

  const closeAddPlayerModal = useCallback(() => {
    setAddPlayerModalIsOpen(false);
  }, []);

  const openRemovePlayerModal = useCallback((player: Player) => {
    setRemovePlayerModalIsOpen(true);
    setSelectedPlayer(player);
  }, []);

  const closeRemovePlayerModal = useCallback(() => {
    setRemovePlayerModalIsOpen(false);
    setSelectedPlayer(null);
  }, []);

  const handleAddPlayer = useCallback((player: Player) => {
    addPlayer(player);
    closeAddPlayerModal();
  }, [
    addPlayer,
    closeAddPlayerModal,
  ]);

  const handleRemovePlayer = useCallback((player: Player) => {
    removePlayer(player.id);
    closeRemovePlayerModal();
  }, [
    removePlayer,
    closeRemovePlayerModal,
  ]);

  const handleClickOnPlayer = useCallback((playerId: string) => {
    window.open(playerOverview(playerId), '_blank');
  }, []);

  const renderPlayer = (player: { playerId: string; totalSetsWon: number; }, index: number) => {
    const playerInfo = playersById[player.playerId];

    return (
      <div
        key={playerInfo.id}
        className='players-list__list__item-container'
      >
        <div className='players-list__list__item__index'>#{index + 1 + playersPageNumber * playersPageSize}</div>
        <PlayerInfo
          id={playerInfo.id}
          name={playerInfo.name}
          totalSetsWon={player.totalSetsWon}
          onClick={handleClickOnPlayer}
          className='players-list__list__item'
        />
        <Button
          variant='danger'
          onClick={openRemovePlayerModal.bind(null, playerInfo)}
        >
          Delete
        </Button>
      </div>
    );
  };

  const playerNames: string[] = useMemo(() => (Object.values(playersById).map((player) => player.name)), [playersById]);

  const players = useMemo(() => (
    playersBySetsWon.slice(playersPageNumber * playersPageSize, (playersPageNumber + 1) * playersPageSize)
  ), [
    playersBySetsWon,
    playersPageNumber,
    playersPageSize,
  ]);

  const playersTotalPages: number = Math.ceil(playersBySetsWon.length / playersPageSize);

  return (
    <div className='players-list'>
      <AddPlayerModal
        isOpen={addPlayerModalIsOpen}
        onCloseModal={closeAddPlayerModal}
        addPlayer={handleAddPlayer}
        playerNames={playerNames}
      />
      {
        selectedPlayer && (
          <RemovePlayerModal
            isOpen={removePlayerModalIsOpen}
            onCloseModal={closeRemovePlayerModal}
            removePlayer={handleRemovePlayer}
            player={selectedPlayer}
          />
        )
      }
      <div className='players-list__header'>
        <div>
          <h1>Players</h1>
          <Link url={matchesList}>Go to Matches</Link>
        </div>
        <Button onClick={openAddPlayerModal}>Add Player</Button>
      </div>
      <div className='players-list__list'>
        {players.map(renderPlayer)}
      </div>
      <Pagination
        pageNumber={playersPageNumber}
        totalPages={playersTotalPages}
        setPageNumber={setPlayersPage}
      />
    </div>
  );
});

export default connector(PlayersList);
