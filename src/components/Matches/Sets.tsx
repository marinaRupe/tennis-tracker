import React from 'react';

import Set from './Set';

interface SetItem {
  id: number;
  playerOnePoints: number;
  playerTwoPoints: number;
}

interface OwnProps {
  sets: SetItem[];
}

type Props = OwnProps;

const Sets: React.FC<Props> = React.memo<Props>(({ sets }) => {
  const renderSet = (set: SetItem) => (
    <Set
      key={set.id}
      id={set.id}
      playerOnePoints={set.playerOnePoints}
      playerTwoPoints={set.playerTwoPoints}
    />
  );

  return (
    <div className='sets'>{sets.map(renderSet)}</div>
  );
});

export default Sets;
