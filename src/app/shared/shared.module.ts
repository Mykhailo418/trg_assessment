// Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';

// components
import { MapComponent } from './components/map/map.component'

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyCntHz-B6w5j1iXsRCNR2u9OR32qMOvKtQ'
      apiKey: 'AIzaSyBSVphwc84_XC9uu2qVZV6LprRDDmzl-D0'
    }),
  ],
  declarations: [
    MapComponent
  ],
  providers: [
    MarkerManager,
    GoogleMapsAPIWrapper,
  ],
  exports: [
      MapComponent
  ]
})
export class SharedModule {
}
