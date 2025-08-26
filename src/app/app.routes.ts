import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { Person } from './core/@types/Person';
import { Vacine } from './core/@types/Vacine';
import { peopleResolver } from './resolvers/people.resolver';
import { vacinesResolver } from './resolvers/vacines.resolver';
import { EditVacineComponent } from './pages/edit-vacine/edit-vacine.component';
import { EditPeopleComponent } from './pages/edit-people/edit-people.component';

export const routes: Routes = [
  {
    path: 'people',
    children: [
      {
        path: '',
        resolve: { table: peopleResolver },
        component: ListComponent<Person>,
      },
      {
        path: 'edit',
        component: EditPeopleComponent,
      },
      {
        path: 'add',
        component: EditPeopleComponent,
      },
    ],
  },
  {
    path: 'vacines',
    children: [
      {
        path: '',
        resolve: { table: vacinesResolver },
        component: ListComponent<Vacine>,
      },
      {
        path: 'edit',
        component: EditVacineComponent,
      },
      {
        path: 'add',
        component: EditVacineComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'people',
  },
];
