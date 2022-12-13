import React, { ReactNode } from 'react';
import Modal from './Modal';

interface OwnProps {
  isOpen: boolean;
  confirm: () => void;
  onClose: () => void;
  title: string;
  children: ReactNode;
  confirmBtnText?: string;
  cancelBtnText?: string;
}

export type Props = OwnProps;

const ConfirmationModal = React.memo(({
  isOpen,
  title,
  confirm,
  onClose,
  children,
  confirmBtnText = 'Confirm',
  cancelBtnText = 'Cancel',
}: Props) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <Modal.Header>
      {title}
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
    <Modal.Footer>
      <Modal.Buttons
        onCloseModal={onClose}
        onSave={confirm}
        saveText={confirmBtnText}
        closeText={cancelBtnText}
      />
    </Modal.Footer>
  </Modal>
));

export default ConfirmationModal;
