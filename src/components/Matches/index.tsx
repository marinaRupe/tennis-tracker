import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  connect,
  ConnectedProps,
} from 'react-redux';
import RemoveMatchModal from './Modals/RemoveMatchModal';

import { Match as MatchModel } from '../../redux/playerMatches/models';
import { RootState } from '../../redux/store';
import Match from './Match';
import Button from '../Buttons/Button';

interface OwnProps {
  matchIds: string[];
  onClickOnMatch?: (matchId: string) => void;
  onRemoveMatch?: (matchId: string) => void;
  className?: string;
  itemClassName?: string;
}

const mapStateToProps = ({ playerMatches }: RootState) => ({
  matchesById: playerMatches.matchesById,
  playersById: playerMatches.playersById,
});

const connector = connect(mapStateToProps);

type Props = OwnProps & ConnectedProps<typeof connector>;

const Matches: React.FC<Props> = React.memo<Props>(({
  matchIds,
  matchesById,
  playersById,
  onClickOnMatch,
  onRemoveMatch,
  className = '',
  itemClassName = '',
}) => {
  const [
    matches,
    setMatches,
  ] = useState<MatchModel[]>([]);
  const [
    selectedMatch,
    setSelectedMatch,
  ] = useState<Nullable<MatchModel>>(null);
  const [
    removeMatchModalIsOpen,
    setRemoveMatchModalIsOpen,
  ] = useState<boolean>(false);

  useEffect(() => {
    const allMatches = Object.values(matchesById);
    const matchesList = allMatches.filter((match) => matchIds.includes(match.id));

    setMatches(matchesList);
  }, [
    matchIds,
    matchesById,
  ]);

  const openRemoveMatchModal = useCallback((match: MatchModel) => {
    setSelectedMatch(match);
    setRemoveMatchModalIsOpen(true);
  }, []);

  const closeRemoveMatchModal = useCallback(() => {
    setSelectedMatch(null);
    setRemoveMatchModalIsOpen(false);
  }, []);

  const handleRemoveMatch = useCallback((matchId: string) => {
    onRemoveMatch?.(matchId);
    closeRemoveMatchModal();
  }, [
    onRemoveMatch,
    closeRemoveMatchModal,
  ]);

  const renderMatch = (match: MatchModel) => (
    <div
      key={match.id}
      className='matches__item-container'
    >
      <Match
        id={match.id}
        playerOne={playersById[match.playerOneId]}
        playerTwo={playersById[match.playerTwoId]}
        sets={match.sets}
        onClick={onClickOnMatch}
        className={`matches__item ${itemClassName}`}
      />
      {
        onRemoveMatch &&
        <Button
          variant='danger'
          onClick={openRemoveMatchModal.bind(null, match)}
        >
          Delete
        </Button>
      }
    </div>
  );

  return (
    <div className={`matches ${className}`}>
      {
        onRemoveMatch && selectedMatch && (
          <RemoveMatchModal
            isOpen={removeMatchModalIsOpen}
            onCloseModal={closeRemoveMatchModal}
            removeMatch={handleRemoveMatch}
            match={selectedMatch}
          />
        )
      }
      {matches.map(renderMatch)}
    </div>
  );
});

export default connector(Matches);
