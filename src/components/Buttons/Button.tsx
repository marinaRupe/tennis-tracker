import React, { ReactNode } from 'react';
import { Button as ReactBootstrapButton } from 'react-bootstrap';

type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'danger';

interface OwnProps {
  children: ReactNode;
  onClick: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

type Props = OwnProps;

const Button = React.memo(({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: Props) => (
  <ReactBootstrapButton
    variant={variant}
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
    className={className}
    size='lg'
  >
    {children}
  </ReactBootstrapButton>
));

export default Button;
