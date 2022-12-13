import React, { ReactNode } from 'react';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const Body: React.FC<Props> = React.memo<Props>(({ children }) => (
  <ReactBootstrapModal.Body>
    {children}
  </ReactBootstrapModal.Body>
));

export default Body;
