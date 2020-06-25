import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Marker } from '../models/marker';

@Injectable({
  providedIn: 'root'
})
export class LocationsStorageService {
  private locationsSubject = new BehaviorSubject([]);

  constructor() { }

  observeLocations(): Observable<Marker[]> {
    return this.locationsSubject.asObservable();
  }

  setLocations(locations: Marker[]): void {
    this.locationsSubject.next(locations);
  }
}
