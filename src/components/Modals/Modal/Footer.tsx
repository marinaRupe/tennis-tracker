import React, { ReactNode } from 'react';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const Footer: React.FC<Props> = React.memo<Props>(({ children }) => (
  <ReactBootstrapModal.Footer>
    {children}
  </ReactBootstrapModal.Footer>
));

export default Footer;
