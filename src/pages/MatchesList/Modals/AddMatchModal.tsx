import React, { useCallback } from 'react';

import MatchForm from '../../../components/Forms/MatchForm';
import Modal from '../../../components/Modals/Modal';
import { maximumSetsCount } from '../../../constants/values';
import { Option } from '../../../models/common/Option';
import { MatchFormData } from '../../../models/forms/MatchFormData';
import { Match } from '../../../redux/playerMatches/models';
import { generateUniqueId } from '../../../utils/idUtils';
import {
  playerOnePointsForSetName,
  playerTwoPointsForSetName,
} from '../../../components/Forms/MatchForm/index';

interface OwnProps {
  isOpen: boolean;
  onCloseModal: () => void;
  addMatch: (form: Match) => void;
  playerOptions: Option<string>[];
}

type Props = OwnProps;

const AddMatchModal: React.FC<Props> = React.memo<Props>(({
  isOpen,
  addMatch,
  onCloseModal,
  playerOptions,
}) => {
  const handleSaveChanges = useCallback((form: MatchFormData) => {
    const sets: Match['sets'] = [];
    for (let setNumber = 1; setNumber <= maximumSetsCount; setNumber++) {
      sets.push({
        id: setNumber,
        playerOnePoints: parseInt(form[playerOnePointsForSetName(setNumber)] as string),
        playerTwoPoints: parseInt(form[playerTwoPointsForSetName(setNumber)] as string),
      });
    }

    addMatch({
      id: generateUniqueId(),
      playerOneId: form.playerOneId,
      playerTwoId: form.playerTwoId,
      sets,
    });
  }, [addMatch]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <Modal.Header>
        Add Match
      </Modal.Header>
      <Modal.Body>
        <MatchForm
          playerOptions={playerOptions}
          onSubmit={handleSaveChanges}
          onCancel={onCloseModal}
        />
      </Modal.Body>
    </Modal>
  );
});

export default AddMatchModal;
