import React, {
  useCallback,
  useState,
  useMemo,
} from 'react';
import {
  connect,
  ConnectedProps,
} from 'react-redux';

import { RootState } from '../../redux/store';
import * as playerMatchesActions from '../../redux/playerMatches/actions';
import Matches from '../../components/Matches';
import {
  matchOverview,
  playersList,
} from '../../constants/clientRoutes';
import Link from '../../components/Navigation/Link';
import Button from '../../components/Buttons/Button';
import AddMatchModal from './Modals/AddMatchModal';
import { Option } from '../../models/common/Option';
import { Match } from '../../redux/playerMatches/models';

const mapStateToProps = ({ playerMatches }: RootState) => ({
  matchesById: playerMatches.matchesById,
  playersById: playerMatches.playersById,
});

const mapDispatchToProps = {
  addMatch: playerMatchesActions.addMatch,
  removeMatch: playerMatchesActions.removeMatch,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const MatchesList: React.FC<Props> = React.memo<Props>(({
  matchesById,
  playersById,
  addMatch,
  removeMatch,
}) => {
  const [
    addMatchModalIsOpen,
    setAddMatchModalIsOpen,
  ] = useState<boolean>(false);

  const matchIds: string[] = useMemo(() => Object.keys(matchesById), [matchesById]);

  const openAddMatchModal = useCallback(() => {
    setAddMatchModalIsOpen(true);
  }, []);

  const closeAddMatchModal = useCallback(() => {
    setAddMatchModalIsOpen(false);
  }, []);

  const handleClickOnMatch = useCallback((matchId: string) => {
    window.open(matchOverview(matchId), '_blank');
  }, []);

  const handleAddMatch = useCallback((match: Match) => {
    addMatch(match);
    closeAddMatchModal();
  }, [
    addMatch,
    closeAddMatchModal,
  ]);

  const handleRemoveMatch = useCallback((matchId: string) => {
    removeMatch(matchId);
  }, [removeMatch]);

  const playerOptions: Option<string>[] = useMemo(() => {
    const players = Object.values(playersById);

    return players.map((player) => ({
      key: player.id,
      value: player.id,
      displayName: player.name,
    } as Option<string>));
  }, [playersById]);

  return (
    <div className='matches-list'>
      <AddMatchModal
        isOpen={addMatchModalIsOpen}
        onCloseModal={closeAddMatchModal}
        addMatch={handleAddMatch}
        playerOptions={playerOptions}
      />
      <div className='matches-list__header'>
        <div>
          <h1>Matches</h1>
          <Link url={playersList}>Go to Players</Link>
        </div>
        <Button onClick={openAddMatchModal}>Add Match</Button>
      </div>
      <Matches
        matchIds={matchIds}
        onClickOnMatch={handleClickOnMatch}
        onRemoveMatch={handleRemoveMatch}
      />
    </div>
  );
});

export default connector(MatchesList);
