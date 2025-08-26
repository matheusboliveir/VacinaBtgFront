import { Vacine } from './Vacine';

export type RequestAddVacine = Omit<Vacine, 'id' | 'doses'>;

export type RequestEditVacine = Omit<Vacine, 'doses'>;
