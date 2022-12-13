import React, { ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface OwnProps {
  url: string;
  children: ReactNode;
  className?: string;
}

type Props = OwnProps;

const Link = React.memo(({
  url,
  children,
  className = '',
}: Props) => (
  <ReactRouterLink
    to={url}
    className={`link ${className}`}
  >
    {children}
  </ReactRouterLink>
));

export default Link;
