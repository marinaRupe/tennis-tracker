import React, {
  useCallback,
  useMemo,
} from 'react';

import {
  maximumSetsCount,
  minimumPointsToWinSet,
  pointDifferenceToWinSet,
  minimumSetsToWinGame,
} from '../../../constants/values';
import { Option } from '../../../models/common/Option';
import { Validation } from '../../../models/common/Validation';
import { MatchFormData } from '../../../models/forms/MatchFormData';
import Form from '../Form';

export const playerOnePointsForSetName = (setNumber: number): string => `set${setNumber}PlayerOnePoints`;
export const playerTwoPointsForSetName = (setNumber: number): string => `set${setNumber}PlayerTwoPoints`;

const validate = (form: MatchFormData): Validation<MatchFormData> => {
  const errors: Validation<MatchFormData>['errors'] = {};

  if (!form.playerOneId) {
    errors.playerOneId = 'Player one is required';
  }

  if (!form.playerTwoId) {
    errors.playerTwoId = 'Player two is required';
  }

  if (form.playerOneId && form.playerTwoId && form.playerOneId === form.playerTwoId) {
    errors.playerTwoId = 'Players must be different';
  }

  let playerOneSetsWon = 0;
  let playerTwoSetsWon = 0;

  for (let setNumber = 1; setNumber <= maximumSetsCount; setNumber++) {
    const playerOnePointsName = playerOnePointsForSetName(setNumber);
    const playerTwoPointsName = playerTwoPointsForSetName(setNumber);

    const playerOnePoints = form[playerOnePointsName] === undefined
      ? undefined
      : parseInt(form[playerOnePointsName] as string);
    const playerTwoPoints = form[playerTwoPointsName] === undefined
      ? undefined
      : parseInt(form[playerTwoPointsName] as string);

    if (setNumber <= minimumSetsToWinGame) {
      if (playerOnePoints === undefined) {
        errors[playerOnePointsName] = 'Missing points';
      }

      if (playerTwoPoints === undefined) {
        errors[playerTwoPointsName] = 'Missing points';
      }
    }

    if (playerOnePoints === undefined && playerTwoPoints === undefined) continue;

    if (playerOnePoints === undefined) {
      errors[playerOnePointsName] = 'Missing points';
    }

    if (playerTwoPoints === undefined) {
      errors[playerTwoPointsName] = 'Missing points';
    }

    if ((playerOnePoints ?? 0) > (playerTwoPoints ?? 0)) {
      playerOneSetsWon++;
    } else {
      playerTwoSetsWon++;
    }

    const pointDifference = Math.abs((playerOnePoints ?? 0) - (playerTwoPoints ?? 0));

    if ((playerOnePoints ?? 0) < minimumPointsToWinSet && (playerTwoPoints ?? 0) < minimumPointsToWinSet) {
      errors[playerTwoPointsName] = `Minimum ${minimumPointsToWinSet} points are required to win a set`;
    } else if (((playerOnePoints ?? 0) === minimumPointsToWinSet || (playerTwoPoints ?? 0) === minimumPointsToWinSet)
      && pointDifference < pointDifferenceToWinSet
    ) {
      errors[playerTwoPointsName] = `Point difference of at least ${pointDifferenceToWinSet} is required to win a set`;
    } else if (((playerOnePoints ?? 0) > minimumPointsToWinSet || (playerTwoPoints ?? 0) > minimumPointsToWinSet)
      && pointDifference !== pointDifferenceToWinSet
    ) {
      errors[playerTwoPointsName] = `Point difference of ${pointDifferenceToWinSet} is required if one player scored above ${minimumPointsToWinSet} points`;
    }
  }

  const winnerSetsWon = Math.max(playerOneSetsWon, playerTwoSetsWon);

  if (winnerSetsWon < minimumSetsToWinGame) {
    errors[playerTwoPointsForSetName(maximumSetsCount)] = `Minimum ${minimumSetsToWinGame} won sets are required to win a game`;
  } else if (winnerSetsWon > minimumSetsToWinGame) {
    const extraSetsFilledCount = winnerSetsWon - minimumSetsToWinGame;
    for (let i = maximumSetsCount; i > (maximumSetsCount - extraSetsFilledCount); i--) {
      errors[playerOnePointsForSetName(i)] = 'Extra set entered';
      errors[playerTwoPointsForSetName(i)] = 'Extra set entered';
    }
  }

  return new Validation(errors);
};

interface OwnProps {
  onSubmit: (form: MatchFormData) => void;
  onCancel?: () => void;
  playerOptions: Option<string>[];
}

type Props = OwnProps;

const MatchForm: React.FC<Props> = React.memo<Props>(({
  onSubmit,
  onCancel,
  playerOptions,
}) => {
  const handleSubmit = useCallback((form: MatchFormData) => {
    onSubmit(form);
  }, [onSubmit]);

  const sets = useMemo(() => {
    const setInputs = [
      (
        <div
          key={'set-header'}
          className='match-form__sets__headers'
        >
          <Form.Label>SET:</Form.Label>
          <Form.Label className='match-form__sets__header'>Player 1:</Form.Label>
          <Form.Label className='match-form__sets__header'>Player 2:</Form.Label>
        </div>
      ),
    ];

    for (let setNumber = 1; setNumber <= maximumSetsCount; setNumber++) {
      const setName = `set${setNumber}`;
      const pointsOneName = playerOnePointsForSetName(setNumber);
      const pointsTwoName = playerTwoPointsForSetName(setNumber);

      setInputs.push(
        <div
          key={setName}
          className='match-form__set'
        >
          <Form.Label>{setNumber}</Form.Label>
          <div className='match-form__set__points-container'>
            <Form.Input
              key={pointsOneName}
              name={pointsOneName}
              type='number'
              min={0}
              className='match-form__set__points'
              placeholder='-'
            />
          </div>
          <div className='match-form__set__points-container'>
            <Form.Input
              key={pointsTwoName}
              name={pointsTwoName}
              type='number'
              min={0}
              className='match-form__set__points'
              placeholder='-'
            />
          </div>
        </div>
      );
    }

    return setInputs;
  }, []);

  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      validate={validate}
      className='match-form'
    >
      <Form.Group className='match-form__player-dropdowns'>
        <div className='match-form__player-dropdown'>
          <Form.Label>Player 1</Form.Label>
          <Form.Dropdown
            name='playerOneId'
            options={playerOptions}
          />
        </div>
        <div className='match-form__player-dropdown'>
          <Form.Label>Player 2</Form.Label>
          <Form.Dropdown
            name='playerTwoId'
            options={playerOptions}
          />
        </div>
      </Form.Group>
      <Form.Group className='match-form__sets'>
        {sets}
      </Form.Group>
    </Form>
  );
});

export default MatchForm;
