import React, { ReactNode } from 'react';
import Form from 'react-bootstrap/Form';

interface OwnProps {
  children: ReactNode;
  className?: string;
}

type Props = OwnProps;

const Group: React.FC<Props> = React.memo<Props>(({
  children,
  className = '',
}) => (
  <Form.Group className={`form__group ${className}`}>{children}</Form.Group>
));

export default Group;
