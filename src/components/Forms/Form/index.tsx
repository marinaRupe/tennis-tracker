import React, {
  ReactNode,
  useCallback,
  useReducer,
} from 'react';
import { Form as ReactBootstrapForm } from 'react-bootstrap';

import {
  FormContext,
  FormDispatchContext,
} from '../../../contexts/formContext';
import { FormActionTypes } from '../../../contexts/formContext/formActionTypes';
import {
  formReducer,
  FormReducerState,
  initialFormReducerState,
} from '../../../contexts/formContext/formReducer';
import { Validation } from '../../../models/common/Validation';
import { FormData } from '../../../models/forms/FormData';
import Buttons from './Buttons';
import Group from './Group';
import Dropdown from './Inputs/Dropdown';
import Input from './Inputs/Input';
import Label from './Label';

interface FormComposition {
  Group: typeof Group;
  Label: typeof Label;
  Input: typeof Input;
  Dropdown: typeof Dropdown;
  Buttons: typeof Buttons;
}

interface OwnProps<TFormData extends FormData = FormData> {
  children: ReactNode;
  onSubmit: (form: TFormData) => void;
  onCancel?: () => void;
  validate?: (form: TFormData) => Validation<TFormData>;
  className?: string;
}

type Props<TFormData extends FormData = FormData> = OwnProps<TFormData>;

const CustomForm = <TFormData extends FormData = FormData>({
  children,
  onSubmit,
  onCancel,
  validate,
  className = '',
}: Props<TFormData>) => {
  const StateContext = FormContext as FormContext<TFormData>;
  const DispatchContext = FormDispatchContext as FormDispatchContext<TFormData>;

  const [
    {
      values: form,
      errors: formErrors,
    },
    dispatch,
  ] = useReducer(formReducer<TFormData>, initialFormReducerState as FormReducerState<TFormData>);

  const handleSubmit = useCallback(() => {
    if (!!validate) {
      const {
        isValid,
        errors,
      } = validate(form);

      if (!isValid) {
        dispatch({
          type: FormActionTypes.UpdateErrors,
          payload: errors,
        });

        return;
      }
    }

    onSubmit(form);
  }, [
    onSubmit,
    form,
    dispatch,
    validate,
  ]);

  return (
    <StateContext.Provider value={{
      values: form,
      errors: formErrors,
    }}
    >
      <DispatchContext.Provider value={dispatch}>
        <ReactBootstrapForm className={className}>
          {children}
          <Group>
            <Buttons
              className='form__buttons'
              onSubmit={handleSubmit}
              onCancel={onCancel}
            />
          </Group>
        </ReactBootstrapForm>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const Form = React.memo(CustomForm) as unknown as (typeof CustomForm & FormComposition);

Form.Group = Group;
Form.Label = Label;
Form.Input = Input;
Form.Dropdown = Dropdown;
Form.Buttons = Buttons;

export default Form;
