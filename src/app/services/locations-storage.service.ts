import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Marker } from '../models/marker';

@Injectable({
  providedIn: 'root'
})
export class LocationsStorageService {
  private locations: Marker[] = [];
  private locationsSubject = new BehaviorSubject([]);

  constructor() { }

  observeLocations(): Observable<Marker[]> {
    return this.locationsSubject.asObservable();
  }

  setLocations(locations: Marker[]): void {
    this.locations = locations;
    this.locationsSubject.next(locations);
  }

  updateLocation(location: Marker): void {
    const locations = this.locations.map((loc: Marker, i: number) => {
      if (loc.id === location.id) {
        return location;
      }
      return loc;
    });
    this.setLocations(locations);
  }

  saveNewLocation(location: Marker): void {
    this.setLocations([...this.locations, location]);
  }

  getLocationsLength(): number {
    return this.locations.length;
  }
}
