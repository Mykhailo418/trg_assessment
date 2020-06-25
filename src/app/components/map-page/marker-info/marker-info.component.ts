import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Marker } from '../../../models/marker';

@Component({
  selector: 'app-marker-info',
  templateUrl: './marker-info.component.html',
  styleUrls: ['./marker-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerInfoComponent implements OnInit {
  @Input('marker') markerInfo: Marker;

  constructor() { }

  ngOnInit(): void {
  }

}
