import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-location-modal',
  templateUrl: './create-location-modal.component.html',
  styleUrls: ['./create-location-modal.component.scss']
})
export class CreateLocationModalComponent implements OnInit {
  @Input() locationId: number;
  @Input() form: FormGroup;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.dismiss();
  }

  save(): void {
    console.log(this.form);
    if (this.form.invalid) return;

    this.activeModal.close({
      id: this.locationId,
      name: this.form.value.name,
      lat: +this.form.value.lat,
      lng: +this.form.value.lng,
    });
  }
}
