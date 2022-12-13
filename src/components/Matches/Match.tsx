import React, {
  useCallback, useMemo,
} from 'react';
import {
  Player,
  Set,
} from '../../redux/playerMatches/models';
import { getMatchWinner } from '../../utils/tennisUtils';
import Sets from './Sets';

interface OwnProps {
  id: string;
  playerOne: Player;
  playerTwo: Player;
  sets: Set[];
  onClick?: (matchId: string) => void;
  className?: string;
}

type Props = OwnProps;

const Match: React.FC<Props> = React.memo<Props>(({
  id,
  playerOne,
  playerTwo,
  sets,
  onClick,
  className = '',
}) => {
  const handleOnClick = useCallback(() => {
    onClick?.(id);
  }, [
    onClick,
    id,
  ]);

  const matchWinner = useMemo(() => {
    const winnerId = getMatchWinner(playerOne.id, playerTwo.id, sets);

    return (playerOne.id === winnerId) ? playerOne : playerTwo;
  }, [
    playerOne,
    playerTwo,
    sets,
  ]);

  return (
    <div className={`match ${className}`}>
      <div
        className={`match__id ${onClick ? 'match__id--clickable' : ''}`}
        onClick={onClick ? handleOnClick : undefined}
      >
        Match {id}
      </div>
      <div className='match__info'>
        <div className='match__info__header'>
          <div>SET:</div>
          <div>{playerOne.name}:</div>
          <div>{playerTwo.name}:</div>
        </div>

        <Sets sets={sets} />
      </div>
      <div className='match__info__winner'>
        <div><b>Winner:&nbsp;</b></div>
        <div>{matchWinner.name}</div>
      </div>
    </div>
  );
});

export default Match;
