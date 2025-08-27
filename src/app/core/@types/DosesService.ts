import { DoseTypeEnum } from './Dose';
import { SexoEnum } from './Person';

export type RequestAddDose = {
  tipo: DoseTypeEnum;
  pessoaId: number;
  vacinaId: SexoEnum;
};
