import { ItemsComponent } from './components/items/items.component';
import { LocationComponent } from './components/location/location.component';
import { GenerationsComponent } from './components/generations/generations.component';
import { GamesComponent } from './components/games/games.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'games', component: GamesComponent },
  { path: 'generations', component: GenerationsComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'items', component: ItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
