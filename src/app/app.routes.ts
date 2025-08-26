import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { Person } from './core/@types/Person';
import { Vacine } from './core/@types/Vacine';
import { peopleResolver } from './resolvers/people.resolver';
import { vacinesResolver } from './resolvers/vacines.resolver';

export const routes: Routes = [
  {
    path: 'people',
    resolve: { table: peopleResolver },
    component: ListComponent<Person>,
  },
  {
    path: 'vacines',
    resolve: { table: vacinesResolver },
    component: ListComponent<Vacine>,
  },
  {
    path: '**',
    redirectTo: 'people',
  },
];
