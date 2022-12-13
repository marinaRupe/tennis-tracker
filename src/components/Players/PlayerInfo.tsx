import React, { useCallback } from 'react';

interface OwnProps {
  id: string;
  name: string;
  totalSetsWon: number;
  onClick?: (playerId: string) => void;
  className?: string;
}

type Props = OwnProps;

const PlayerInfo: React.FC<Props> = React.memo<Props>(({
  id,
  name,
  totalSetsWon,
  onClick,
  className = '',
}) => {
  const handleOnClick = useCallback(() => {
    onClick?.(id);
  }, [
    onClick,
    id,
  ]);

  return (
    <div
      className={`player-info ${className}`}
      onClick={onClick ? handleOnClick : undefined}
    >
      <div className='player-info__name'>{name}</div>
      <div className='player-info__total-sets'><b>Total sets won:</b> {totalSetsWon}</div>
    </div>
  );
});

export default PlayerInfo;
