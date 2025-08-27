import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PeopleService } from '../core/services/people.service';
import { map, Observable } from 'rxjs';
import { TableProps } from '../core/@types/List';
import { Person, SexoEnum } from '../core/@types/Person';

export const peopleResolver: ResolveFn<Observable<TableProps<Person>>> = (
  route,
  state
) => {
  const peopleService = inject(PeopleService);

  return peopleService.list().pipe(
    map((response) => {
      return {
        title: 'Pessoas',
        items: response,
        actions: [
          {
            name: 'editar',
            color: 'warning',
            link: 'edit',
          },
          {
            name: 'Ver Cartão',
            color: 'primary',
            link: 'vacine-card',
          },
        ],
        columns: [
          {
            key: 'nome',
            label: 'Nome',
          },
          {
            key: 'idade',
            label: 'Idade',
          },
          {
            key: 'sexo',
            label: 'Gênero',
            formatter: (s) => SexoEnum[s as number],
          },
        ],
      } as TableProps<Person>;
    })
  );
};
