import React, { useCallback } from 'react';

import { Validation } from '../../../models/common/Validation';
import { PlayerFormData } from '../../../models/forms/PlayerFormData';
import Form from '../Form';

interface OwnProps {
  playerNames: string[];
  onSubmit: (form: PlayerFormData) => void;
  onCancel?: () => void;
}

type Props = OwnProps;

const PlayerForm: React.FC<Props> = React.memo<Props>(({
  playerNames,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = useCallback((form: PlayerFormData) => {
    onSubmit(form);
  }, [onSubmit]);

  const validate = useCallback((form: PlayerFormData): Validation<PlayerFormData> => {
    const errors: Validation<PlayerFormData>['errors'] = {};

    if (!form.name) {
      errors.name = 'Player name is required';
    } else if (playerNames.find((playerName) => playerName === form.name)) {
      errors.name = 'Player with that name already exists';
    }

    return new Validation(errors);
  }, [playerNames]);

  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      validate={validate}
      className='player-form'
    >
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Input name='name' />
      </Form.Group>
    </Form>
  );
});

export default PlayerForm;
