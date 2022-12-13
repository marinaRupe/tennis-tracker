import React, { useCallback } from 'react';
import ConfirmationModal from '../../../components/Modals/ConfirmationModal';
import { Player } from '../../../redux/playerMatches/models';

interface OwnProps {
  isOpen: boolean;
  onCloseModal: () => void;
  removePlayer: (player: Player) => void;
  player: Player;
}

type Props = OwnProps;

const RemovePlayerModal: React.FC<Props> = React.memo<Props>(({
  isOpen,
  removePlayer,
  onCloseModal,
  player,
}) => {
  const handleConfirm = useCallback(() => {
    removePlayer(player);
  }, [
    removePlayer,
    player,
  ]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onCloseModal}
      confirm={handleConfirm}
      title='Remove Match'
    >
      <p>Are you sure you want to remove player <b>{player.name}</b>?</p>
      <p>All matches played by this player are also going to be removed.</p>
    </ConfirmationModal>
  );
});

export default RemovePlayerModal;
