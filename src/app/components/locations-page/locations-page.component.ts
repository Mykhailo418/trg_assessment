import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LocationsStorageService } from '../../services/locations-storage.service';
import { Marker } from '../../models/marker';
import { ORDER } from '../../constants/order';
import { Sorting } from '../../models/sorting';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit, AfterViewInit {
  @ViewChild('tableWrapper') tableWrapperEl: ElementRef;

  locations$: Observable<Marker[]>;
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

  constructor(private locationsStorageService: LocationsStorageService) { }

  ngOnInit(): void {
    const sorting$ = this.sortingChanged.asObservable()
      .pipe(
        tap((sorting: Sorting) => this.sorting = sorting)
      );
    this.locations$ = combineLatest(
      this.locationsStorageService.observeLocations(),
      sorting$
    ).pipe(
      map(([locations, sorting]: [Marker[], Sorting]) => {
        if (sorting.sortBy) {
          // TODO: send copy from storage
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
      this.locations$,
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

  private calculateLocationsPerPage(): number {
    this.tableWrapperHeight = this.tableWrapperEl.nativeElement.offsetHeight;
    const perPage =  Math.floor((this.tableWrapperHeight - this.paginationHeight - this.theadHeight + this.tableMarginTop)/(this.rowHeight + this.borderSpacingn));
    return Math.max(perPage, 1);
  }

}
