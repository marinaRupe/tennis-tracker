import React, { useCallback } from 'react';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import { Match } from '../../../redux/playerMatches/models';

interface OwnProps {
  isOpen: boolean;
  onCloseModal: () => void;
  removeMatch: (matchId: string) => void;
  match: Match;
}

type Props = OwnProps;

const RemoveMatchModal: React.FC<Props> = React.memo<Props>(({
  isOpen,
  removeMatch,
  onCloseModal,
  match,
}) => {
  const handleConfirm = useCallback(() => {
    removeMatch(match.id);
  }, [
    removeMatch,
    match,
  ]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onCloseModal}
      confirm={handleConfirm}
      title='Remove Match'
    >
      <p>Are you sure you want to remove match <b>{match.id}</b>?</p>
    </ConfirmationModal>
  );
});

export default RemoveMatchModal;
