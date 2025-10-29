import { RouterModule, Routes } from '@angular/router';
import { CarsListComponent } from '../components/cars-list/cars-list';
import { Home } from '../components/home/home';
import { NgModule } from '@angular/core';
import { UsersList } from '../components/users-list/users-list';
import { ShowHeader } from '../components/show-header/show-header';
import { Settings } from '../components/settings/settings';
import { Favorites } from '../components/favorites/favorites';
import { Countries } from '../components/countries/countries';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'users-list', component: UsersList },
  { path: 'show-header', component: ShowHeader },
  { path: 'cars-page', component: CarsListComponent },
  { path: 'cars-favorites', component: Favorites },
  { path: 'settings', component: Settings },
  { path: 'countries', component: Countries },

  { path: '**', redirectTo: '/home' }, // wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
