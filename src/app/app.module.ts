import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

// modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// components
import { AppComponent } from './app.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MarkerInfoComponent } from './components/map-page/marker-info/marker-info.component';
import { LocationsPageComponent } from './components/locations-page/locations-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MapPageComponent,
    HeaderComponent,
    MarkerInfoComponent,
    LocationsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbModalModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
