import React, { useCallback } from 'react';

import PlayerForm from '../../../components/Forms/PlayerForm';
import Modal from '../../../components/Modals/Modal';
import { PlayerFormData } from '../../../models/forms/PlayerFormData';
import { Player } from '../../../redux/playerMatches/models';
import { generateUniqueId } from '../../../utils/idUtils';

interface OwnProps {
  isOpen: boolean;
  onCloseModal: () => void;
  addPlayer: (player: Player) => void;
  playerNames: string[];
}

type Props = OwnProps;

const AddPlayerModal: React.FC<Props> = React.memo<Props>(({
  isOpen,
  addPlayer,
  onCloseModal,
  playerNames,
}) => {
  const handleSaveChanges = useCallback((form: PlayerFormData) => {
    addPlayer({
      ...form,
      id: generateUniqueId(),
    });
  }, [addPlayer]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <Modal.Header>
        Add Player
      </Modal.Header>
      <Modal.Body>
        <PlayerForm
          playerNames={playerNames}
          onSubmit={handleSaveChanges}
          onCancel={onCloseModal}
        />
      </Modal.Body>
    </Modal>
  );
});

export default AddPlayerModal;
