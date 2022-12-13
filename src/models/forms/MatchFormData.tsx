import { FormData } from './FormData';

export interface MatchFormData extends FormData {
  playerOneId: string;
  playerTwoId: string;

  set1PlayerOnePoints: string;
  set1PlayerTwoPoints: string;

  set2PlayerOnePoints: string;
  set2PlayerTwoPoints: string;

  set3PlayerOnePoints: string;
  set3PlayerTwoPoints: string;

  set4PlayerOnePoints: string;
  set4PlayerTwoPoints: string;

  set5PlayerOnePoints: string;
  set5PlayerTwoPoints: string;
}
