import React, { ReactNode } from 'react';
import Form from 'react-bootstrap/Form';

interface OwnProps {
  children: ReactNode;
  className?: string;
}

type Props = OwnProps;

const Label: React.FC<Props> = React.memo<Props>(({
  children,
  className = '',
}) => (
  <Form.Label className={`form__label ${className}`}>{children}</Form.Label>
));

export default Label;
