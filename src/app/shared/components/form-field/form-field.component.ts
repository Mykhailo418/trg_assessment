import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],

})
export class FormFieldComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() fieldName: string;
  @Input() label: string;

  private defaultErrorText = 'Error';
  private errorDescriptions = {
    required: 'This field is required',
    pattern: 'Invalid value',
  }

  constructor() { }

  ngOnInit(): void {
  }

  showErrors(): string[] {
    return Object.keys(this.form.get(this.fieldName).errors)
      .map(key => this.errorDescriptions[key] || this.defaultErrorText);
  }
}
