import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LocationsStorageService } from '../../services/locations-storage.service';
import { Marker } from '../../models/marker';
import { ORDER } from '../../constants/order';
import { Sorting } from '../../models/sorting';
import { CreateLocationModalComponent } from './create-location-modal/create-location-modal.component';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit, AfterViewInit {
  @ViewChild('tableWrapper') tableWrapperEl: ElementRef;

  locations$: Observable<Marker[]>;
  sortedLocations$: Observable<Marker[]>;
  locationsToShow$: Observable<Marker[]>;
  locationsPerPageChanged = new Subject<number>();
  currentPageChanged = new BehaviorSubject<number>(1);
  sortingChanged = new BehaviorSubject<Sorting>({
    sortBy: '',
    orderBy: ORDER.ASC
  });

  tableWrapperHeight: number;
  locationsPerPage: number;
  theadHeight: number;
  rowHeight: number;
  paginationHeight: number;
  currentPage = 1;
  borderSpacingn = 8;
  tableMarginTop = 7;

  sorting: Sorting = {
    sortBy: '',
    orderBy: ORDER.ASC
  };

  editMode = false;
  forms = {};

  private latLngPattern = /^\d{2}\.\d{5,7}$/;

  constructor(private locationsStorageService: LocationsStorageService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.locations$ = this.locationsStorageService.observeLocations()
      .pipe(
        // make copy of locations to prevent mutation
        map((locations: Marker[]) => locations.map((location: Marker) => {
          return  {...location};
        } ))
      );

    const sorting$ = this.sortingChanged.asObservable()
      .pipe(
        tap((sorting: Sorting) => this.sorting = sorting)
      );

    this.sortedLocations$ = combineLatest(
      this.locations$,
      sorting$
    ).pipe(
      map(([locations, sorting]: [Marker[], Sorting]) => {
        if (sorting.sortBy) {
          locations.sort((location1, location2) => {
            if (location1[sorting.sortBy] > location2[sorting.sortBy]) {
              return sorting.orderBy === ORDER.DESC ? -1 : 1;
            } else {
              return sorting.orderBy === ORDER.DESC ? 1 : -1;
            }
          });
        }
        return locations;
      })
    );

    this.locationsToShow$ = combineLatest(
      this.sortedLocations$,
      this.locationsPerPageChanged,
      this.currentPageChanged
    ).pipe(
      map(([locations, perPage, page]: [Marker[], number, number]) => {
        const start = (page - 1) * perPage;
        const end  = start + perPage;
        return locations.slice(start, end);
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.theadHeight = this.tableWrapperEl.nativeElement.querySelector('thead').offsetHeight;
      const tbodyTr = this.tableWrapperEl.nativeElement.querySelector('tbody tr');
      this.rowHeight = tbodyTr && tbodyTr.offsetHeight || 46;
      this.paginationHeight = this.tableWrapperEl.nativeElement.querySelector('.pagination-wrapper').offsetHeight;
      this.changeLocationsPerPage();
    });
  }

  onResize(event: Event): void {
    if (this.tableWrapperHeight !== this.tableWrapperEl.nativeElement.offsetHeight) {
      this.changeLocationsPerPage();
      this.editMode = false;
      this.forms = {};
    }
  }

  onCurrentPageChange(): void {
    this.currentPageChanged.next(this.currentPage);
  }

  changeLocationsPerPage(): void {
    this.currentPage = 1;
    this.locationsPerPage = this.calculateLocationsPerPage();
    this.locationsPerPageChanged.next(this.locationsPerPage);
    this.currentPageChanged.next(this.currentPage);
  }

  sortColumns(sortBy: string): void {
    const sorting = {
      sortBy,
      orderBy: this.sorting.orderBy === ORDER.DESC && this.sorting.sortBy === sortBy ? ORDER.ASC : ORDER.DESC
    }
    this.sortingChanged.next(sorting);
  }

  editLocation(location: Marker, rowIndex: number): void {
    this.editMode = true;
    this.forms[rowIndex] = this.createForm(location);
  }

  cancelEditing(rowIndex: number): void {
    delete this.forms[rowIndex];
    this.editMode = !!Object.keys(this.forms).length;
    console.log(this.editMode, Object.keys(this.forms).length, this.forms);
  }

  saveEditing(rowIndex: number, location: Marker): void {
    if (this.forms[rowIndex].invalid) return;
    this.locationsStorageService.updateLocation({
      id: location.id,
      name: this.forms[rowIndex].value.name,
      lat: +this.forms[rowIndex].value.lat,
      lng: +this.forms[rowIndex].value.lng,
    });
    delete this.forms[rowIndex];
    this.editMode = !!Object.keys(this.forms).length;
    console.log(this.forms);
  }

  addNewLocation(): void {
    const modalRef = this.modalService.open(CreateLocationModalComponent, {size: 'md'})

    modalRef.componentInstance.locationId = this.locationsStorageService.getLocationsLength();
    modalRef.componentInstance.form = this.createForm({
      id: null,
      name: null,
      lat: null,
      lng: null
    });

    console.log(modalRef.componentInstance.form);
    modalRef.result
      .then((location: Marker) => {
        this.locationsStorageService.saveNewLocation(location);
      }, () => {});
  }

  private createForm(location: Marker): FormGroup {
    return new FormGroup({
      name: new FormControl(location.name, [Validators.required]),
      lat: new FormControl(location.lat, [Validators.required, Validators.pattern(this.latLngPattern)]),
      lng: new FormControl(location.lng, [Validators.required, Validators.pattern(this.latLngPattern)])
    });
  }

  private calculateLocationsPerPage(): number {
    this.tableWrapperHeight = this.tableWrapperEl.nativeElement.offsetHeight;
    const perPage =  Math.floor((this.tableWrapperHeight - this.paginationHeight - this.theadHeight + this.tableMarginTop)/(this.rowHeight + this.borderSpacingn));
    return Math.max(perPage, 1);
  }

}
