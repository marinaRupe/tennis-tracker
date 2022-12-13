import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';

import {
  useFormContext,
  useFormDispatchContext,
} from '../../../../contexts/formContext';
import { FormActionTypes } from '../../../../contexts/formContext/formActionTypes';
import { Option } from '../../../../models/common/Option';

interface OwnProps<T extends string | number = string | number> {
  name: string;
  options: Option<T>[];
  placeholder?: string;
  className?: string;
}

type Props<T extends string | number = string | number> = OwnProps<T>;

const Dropdown: React.FC<Props> = <T extends string | number = string | number>({
  name,
  options,
  placeholder = 'Select...',
  className = '',
}: Props<T>) => {
  const { errors } = useFormContext();
  const dispatch = useFormDispatchContext();

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    dispatch?.({
      type: FormActionTypes.UpdateProperty,
      payload: {
        name,
        value,
      },
    });
  }, [
    name,
    dispatch,
  ]);

  const error: string | undefined = errors[name];

  return (
    <div>
      <Form.Select
        className={className}
        aria-label={placeholder}
        placeholder={placeholder}
        onChange={handleOnChange}
      >
        <option
          key='placeholder'
          style={{ display: 'none' }}
        >
          {placeholder}
        </option>
        {
          options.map((option) => (
            <option
              key={option.key}
              value={option.value}
            >{option.displayName}
            </option>
          ))
        }
      </Form.Select>
      {
        !!error &&
        <div className='form__error'>{error}</div>
      }
    </div>
  );
};

export default React.memo(Dropdown) as typeof Dropdown;
