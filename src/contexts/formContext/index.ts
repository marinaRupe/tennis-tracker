import {
  Context,
  createContext,
  Dispatch,
  useContext,
} from 'react';

import { FormData } from '../../models/forms/FormData';
import {
  FormReducerAction,
  FormReducerState,
  initialFormReducerState,
} from './formReducer';

export type FormContext<TFormState extends FormData> = Context<FormReducerState<TFormState>>;

export type FormDispatchContext<TFormState extends FormData>
  = Context<Nullable<Dispatch<FormReducerAction<TFormState>>>>;

export const FormContext = createContext<FormReducerState<FormData>>(initialFormReducerState);
export const FormDispatchContext = createContext(null);

export const useFormContext = <TFormState extends FormData>() => {
  const context = useContext(FormContext as FormContext<TFormState>);

  return context;
};

export const useFormDispatchContext = <TFormState extends FormData>() => {
  const context = useContext(FormDispatchContext as FormDispatchContext<TFormState>);

  return context;
};
