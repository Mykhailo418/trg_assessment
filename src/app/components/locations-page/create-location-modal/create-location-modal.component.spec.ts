import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocationModalComponent } from './create-location-modal.component';

describe('CreateLocationModalComponent', () => {
  let component: CreateLocationModalComponent;
  let fixture: ComponentFixture<CreateLocationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLocationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
