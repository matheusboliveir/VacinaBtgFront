import { SexoEnum } from './Person';

export type RequestAddPeople = {
  nome: string;
  idade: number;
  sexo: SexoEnum;
};
