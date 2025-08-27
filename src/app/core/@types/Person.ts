export interface Person {
  id: number;
  nome: string;
  idade: number;
  sexo: SexoEnum;
}

export enum SexoEnum {
  MASCULINO = 0,
  FEMININO = 1,
  OUTRO = 2,
}
