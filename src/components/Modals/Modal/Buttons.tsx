import React, { useCallback } from 'react';

import Button from '../../Buttons/Button';

interface OwnProps {
  onCloseModal?: () => void;
  onSave?: () => void;
  closeText?: string;
  saveText?: string;
  className?: string;
}

type Props = OwnProps;

const Buttons: React.FC<Props> = React.memo<Props>(({
  onCloseModal,
  onSave,
  closeText = 'Close',
  saveText = 'Save',
  className = '',
}) => {
  const handleSaveChanges = useCallback(() => {
    onSave!();
  }, [onSave]);

  return (
    <div className={`modal__buttons ${className}`}>
      {
        onCloseModal &&
        <Button
          variant='secondary'
          onClick={onCloseModal}
        >
          {closeText}
        </Button>
      }
      {
        handleSaveChanges &&
        <Button
          variant='primary'
          onClick={handleSaveChanges}
        >
          {saveText}
        </Button>
      }
    </div>
  );
});

export default Buttons;
