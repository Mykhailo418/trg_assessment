import { Component, OnInit } from '@angular/core';
import { LocationsService } from './services/locations.service';
import { LocationsStorageService } from './services/locations-storage.service';
import { Marker } from './models/marker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private locationsService: LocationsService,
              private locationsStorageService: LocationsStorageService) { }

  ngOnInit(): void {
    this.locationsService.fetchLocations()
      .subscribe((locations: Marker[]) => {
        this.locationsStorageService.setLocations(locations);
      });
  }
}
