import React from 'react';

import Button from '../../Buttons/Button';

interface OwnProps {
  onSubmit: () => void;
  onCancel?: () => void;
  cancelText?: string;
  submitText?: string;
  className?: string;
}

type Props = OwnProps;

const Buttons: React.FC<Props> = React.memo<Props>(({
  onCancel,
  onSubmit,
  cancelText = 'Cancel',
  submitText = 'Submit',
  className = '',
}) => (
  <div className={className}>
    {
      onCancel &&
      <Button
        variant='secondary'
        onClick={onCancel}
      >
        {cancelText}
      </Button>
    }
    <Button
      variant='primary'
      onClick={onSubmit}
    >
      {submitText}
    </Button>
  </div>
));

export default Buttons;
