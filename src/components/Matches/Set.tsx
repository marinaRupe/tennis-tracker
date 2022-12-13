import React from 'react';

interface OwnProps {
  id: number;
  playerOnePoints: number;
  playerTwoPoints: number;
}

type Props = OwnProps;

const Set: React.FC<Props> = React.memo<Props>(({
  id,
  playerOnePoints,
  playerTwoPoints,
}) => {
  const playerOneWins = playerOnePoints > playerTwoPoints;
  const playerTwoWins = playerTwoPoints > playerOnePoints;

  return (
    <div className='set'>
      <div className='set__id'>{id}</div>
      <div className={`set__points ${playerOneWins ? 'set__points--winning' : ''}`}>{playerOnePoints}</div>
      <div className={`set__points ${playerTwoWins ? 'set__points--winning' : ''}`}>{playerTwoPoints}</div>
    </div>
  );
});

export default Set;
