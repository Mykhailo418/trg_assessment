// Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { MapComponent } from './components/map/map.component';
import { FormFieldComponent } from './components/form-field/form-field.component'

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyBb41mZsTjWcZiUtrusxT7s5j4XbfDzRRQ'
      apiKey: 'AIzaSyBSVphwc84_XC9uu2qVZV6LprRDDmzl-D0'
    }),
    ReactiveFormsModule
  ],
  declarations: [
    MapComponent,
    FormFieldComponent
  ],
  providers: [
    MarkerManager,
    GoogleMapsAPIWrapper,
  ],
  exports: [
      MapComponent,
      FormFieldComponent
  ]
})
export class SharedModule {
}
