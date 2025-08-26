import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
  {
    path: 'people',
    component: ListComponent,
  },
  {
    path: 'vacines',
    component: ListComponent,
  },
  {
    path: '**',
    redirectTo: 'people',
  },
];
