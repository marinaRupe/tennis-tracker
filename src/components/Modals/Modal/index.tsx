import React, { ReactNode } from 'react';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';

import Body from './Body';
import Buttons from './Buttons';
import Footer from './Footer';
import Header from './Header';

interface ModalComposition {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
  Buttons: typeof Buttons;
}

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

type Props = OwnProps;

const CustomModal: React.FC<Props> = React.memo<Props>(({
  isOpen,
  onClose,
  children,
}) => (
  <ReactBootstrapModal
    show={isOpen}
    onHide={onClose}
    centered={true}
    size='lg'
  >
    {children}
  </ReactBootstrapModal>
));

const Modal = CustomModal as (typeof CustomModal & ModalComposition);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.Buttons = Buttons;

export default Modal;
