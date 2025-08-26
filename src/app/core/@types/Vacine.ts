import { Dose } from './Dose';

export interface Vacine {
  id: number;
  nome: string;
  tipo: VacineTypeEnum;
  numeroDose: number;
  numeroReforco: number;
  semLimiteDose: boolean;
  doses: Dose[];
}

export enum VacineTypeEnum {
  CALENDARIO_NACIONAL = 0,
  ANTI_RABICA = 1,
  BCG_CONTATO = 2,
  PARTICULAR = 3,
  OUTRO = 4,
}
