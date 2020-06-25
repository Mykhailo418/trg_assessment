import { Component, OnInit } from '@angular/core';

import { LocationsStorageService } from '../../services/locations-storage.service';
import { Marker } from '../../models/marker';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit {

  constructor(private locationsStorageService: LocationsStorageService) { }

  ngOnInit(): void {
  }

}
