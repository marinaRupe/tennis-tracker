import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';

import {
  useFormContext,
  useFormDispatchContext,
} from '../../../../contexts/formContext';
import { FormActionTypes } from '../../../../contexts/formContext/formActionTypes';

interface OwnProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
}

type Props = OwnProps;

const Input: React.FC<Props> = React.memo<Props>(({
  name,
  type = 'text',
  placeholder = '',
  className = '',
  min,
  max,
}) => {
  const { errors } = useFormContext();
  const dispatch = useFormDispatchContext();

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    dispatch?.({
      type: FormActionTypes.UpdateProperty,
      payload: {
        name,
        value: value === '' ? undefined : value,
      },
    });
  }, [
    name,
    dispatch,
  ]);

  const error: string | undefined = errors[name];

  return (
    <div>
      <Form.Control
        className={className}
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
        min={min}
        max={max}
      />
      {
        !!error &&
        <div className='form__error'>{error}</div>
      }
    </div>
  );
});

export default Input;
