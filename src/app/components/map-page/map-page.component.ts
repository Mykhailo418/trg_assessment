import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LocationsStorageService } from '../../services/locations-storage.service';
import { Marker } from '../../models/marker';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  locations$: Observable<Marker[]>;
  selectedMarker: Marker;

  constructor(private locationsStorageService: LocationsStorageService) { }

  ngOnInit(): void {
    this.locations$ = this.locationsStorageService.observeLocations();
  }

  onMarkerClick(marker: Marker): void {
    this.selectedMarker = marker;
  }

  onInfoMarkerClose(): void {
    this.selectedMarker = null;
  }

}
