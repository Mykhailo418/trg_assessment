import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Location } from '../models/location';
import { Marker } from '../models/marker';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }

  fetchLocations(): Observable<Marker[]> {
    return this.http.get<Location[]>("./assets/locations.json")
      .pipe(
        map((locations: Location[]) => this.convertLocationsToMarkers(locations)),
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
  }

  private convertLocationsToMarkers(locations: Location[]): Marker[] {
    return locations.map((location: Location) => ({
      lat: location.coordinates[0],
      lng: location.coordinates[1],
      name: location.name
    }) );
  }
}
