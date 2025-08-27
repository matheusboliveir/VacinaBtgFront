import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { VacinesService } from '../core/services/vacines.service';
import { map, Observable } from 'rxjs';
import { TableProps } from '../core/@types/List';
import { Vacine, VacineTypeEnum } from '../core/@types/Vacine';

export const vacinesResolver: ResolveFn<Observable<TableProps<Vacine>>> = (
  route,
  state
) => {
  const vacineService = inject(VacinesService);

  return vacineService.list().pipe(
    map((response) => {
      return {
        title: 'Vacinas',
        items: response,
        actions: [
          {
            name: 'editar',
            color: 'warning',
            link: 'edit',
          },
        ],
        columns: [
          {
            key: 'nome',
            label: 'Nome',
          },
          {
            key: 'numeroDose',
            label: 'Doses',
          },
          {
            key: 'numeroReforco',
            label: 'Reforço',
          },
          {
            key: 'semLimiteDose',
            label: 'Sem Limite',
            formatter: (s) => (s ? 'Sim' : 'Não'),
          },
          {
            key: 'tipo',
            label: 'Tipo',
            formatter: (t) => VacineTypeEnum[t as number],
          },
        ],
      } as TableProps<Vacine>;
    })
  );
};
