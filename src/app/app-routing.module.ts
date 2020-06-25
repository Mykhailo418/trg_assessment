import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { MapPageComponent } from './components/map-page/map-page.component';
import { LocationsPageComponent } from './components/locations-page/locations-page.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapPageComponent
  },
  {
    path: 'locations',
    component: LocationsPageComponent
  },
  {
    path: '**',
    redirectTo: 'map'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
