import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MouseEvent as MouseMapEvent } from '@agm/core';
import { Subscription } from 'rxjs';

import { Marker } from '../../../models/marker';

@Component({
  selector: 'app-create-location-modal',
  templateUrl: './create-location-modal.component.html',
  styleUrls: ['./create-location-modal.component.scss']
})
export class CreateLocationModalComponent implements OnInit, OnDestroy {
  @Input() locationId: number;
  @Input() form: FormGroup;

  markers: Marker[] = [];
  valueChangesSubscription: Subscription;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.valueChangesSubscription = this.form.valueChanges
      .subscribe(data => {
        if (this.form.get('lat').valid && this.form.get('lng').valid) {
          this.setMarkers(+data.lat, +data.lng);
        }
      });
  }

  close(): void {
    this.activeModal.dismiss();
  }

  save(): void {
    if (this.form.invalid) return;

    this.activeModal.close({
      id: this.locationId,
      name: this.form.value.name,
      lat: +this.form.value.lat,
      lng: +this.form.value.lng,
    });
  }

  onMapClick(event: MouseMapEvent): void {
    this.setMarkers(event.coords.lat, event.coords.lng);
    this.form.get('lat').setValue(event.coords.lat);
    this.form.get('lng').setValue(event.coords.lng);
  }

  private setMarkers(lat: number, lng: number): void {
    this.markers = [{
      id: null,
      name: '',
      lat: lat,
      lng: lng,
    }];
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }
}
