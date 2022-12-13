import { Validation } from '../../models/common/Validation';
import { FormData } from '../../models/forms/FormData';
import { FormActionTypes } from './formActionTypes';

export type FormReducerAction<TFormState extends FormData> =
  { type: FormActionTypes.InitializeForm; payload: { initialState: TFormState; }; }
  | { type: FormActionTypes.UpdateProperty; payload: { name: keyof TFormState; value: string | undefined; }; }
  | { type: FormActionTypes.UpdateErrors; payload: Validation<TFormState>['errors']; };

export interface FormReducerState<TFormState extends FormData> {
  values: TFormState;
  errors: Validation<TFormState>['errors'];
}

export const initialFormReducerState = {
  values: {},
  errors: {},
};

export const formReducer = <TFormState extends FormData>(
  formState: FormReducerState<TFormState>,
  action: FormReducerAction<TFormState>
): FormReducerState<TFormState> => {
  switch (action.type) {
    case FormActionTypes.InitializeForm: {
      return ({
        values: action.payload.initialState,
        errors: {} as Validation<TFormState>['errors'],
      });
    }
    case FormActionTypes.UpdateProperty: {
      return ({
        ...formState,
        values: {
          ...formState.values,
          [action.payload.name]: action.payload.value,
        },
      });
    }
    case FormActionTypes.UpdateErrors: {
      return ({
        ...formState,
        errors: action.payload,
      });
    }
    default: {
      throw Error('Unknown action');
    }
  }
};
