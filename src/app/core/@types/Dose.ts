export interface Dose {
  id: number;
  tipo: DoseTypeEnum;
  numero: number;
  vacina?: string;
}

export enum DoseTypeEnum {
  COMUM = 0,
  REFORCO = 1,
}
