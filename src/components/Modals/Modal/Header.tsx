import React, { ReactNode } from 'react';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const Header: React.FC<Props> = React.memo<Props>(({ children }) => (
  <ReactBootstrapModal.Header closeButton={true}>
    <ReactBootstrapModal.Title>
      {children}
    </ReactBootstrapModal.Title>
  </ReactBootstrapModal.Header>
));

export default Header;
