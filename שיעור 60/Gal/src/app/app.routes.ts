import { RouterModule, Routes } from '@angular/router';
import { CarsListComponent } from '../components/cars-list/cars-list';
import { Home } from '../components/home/home';
import { NgModule } from '@angular/core';
import { UsersList } from '../components/users-list/users-list';
import { ShowHeader } from '../components/show-header/show-header';
import { Settings } from '../components/settings/settings';
import { FavoritesList } from '../components/favorites-list/favorites-list';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'users-list', component: UsersList },
  { path: 'show-header', component: ShowHeader },
  { path: 'cars-page', component: CarsListComponent },
  { path: 'favorites-page', component: FavoritesList },
  { path: 'settings', component: Settings },

  { path: '**', redirectTo: '/home' }, // wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
