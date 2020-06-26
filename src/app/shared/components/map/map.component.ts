import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { MouseEvent, AgmMarker, AgmInfoWindow } from '@agm/core';

import { Marker } from '../../../models/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, OnChanges {
  @Input() markers: Marker[] = [];
  @Input() showInfoWindow: boolean = true;
  @Output('onMapClick') onMapClickEvent = new EventEmitter<MouseEvent>();
  @Output('onMarkerClick') onMarkerClickEvent = new EventEmitter<Marker>();
  @Output('onInfoClose') onInfoCloseEvent = new EventEmitter<null>();

  lat: number;
  lng: number;
  zoom = 8;
  mapTypeId = 'roadmap';

  selectedMarker: Marker;
  selectedInfoWindow: AgmInfoWindow;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('markers') && this.markers.length) {
      this.lat = this.markers[0].lat;
      this.lng = this.markers[0].lng;
    }
  }

  ngOnInit(): void {
  }

  onMapClick(event: MouseEvent): void {
    this.closeInfo();
    this.onMapClickEvent.emit(event);
  }

  onMarkerClick(agmMarker: AgmMarker, marker: Marker): void {
    this.selectedMarker = marker;
    this.selectedInfoWindow = agmMarker.infoWindow.first;
    this.onMarkerClickEvent.emit(marker);
  }

  onInfoWindowClose(): void {
    if (this.selectedInfoWindow && !this.selectedInfoWindow.isOpen) {
      this.closeInfo();
    }
  }

  private closeInfo(): void {
    if (this.selectedInfoWindow) {
      this.selectedInfoWindow.close();
    }
    this.selectedMarker = null;
    this.selectedInfoWindow = null;
    this.onInfoCloseEvent.emit();
  }

}
